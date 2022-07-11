import { CSSProperties, FC, ReactNode } from "react";
import styles from "./Node.module.scss";
import { Node as NodeType, ValueType } from "../types";
import classNames from "classnames/bind";
import { assertNever } from "../../typeguards";
import PrimitiveNode from "./PrimitiveNode";
import ObjectNode from "./ObjectNode";
import { SharedNodeProps } from "./types";
import { useResizeObserver } from "../../ResizeObserver";
import Caret from "./Caret";
import useHover from "../../hooks/useHover";
import useFocusVisible from "../../FocusVisible/useFocusVisible";

const cx = classNames.bind(styles);

export type NodeProps = {
  style?: CSSProperties;
  expanded?: boolean;
  focused?: boolean;
  childHovered?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  onMeasure?: (height: number) => void;
  node: NodeType;
};

const nodeIsExpandable = (type: ValueType): boolean =>
  type === "object" || type === "array";

const getNodeContent = (node: NodeType, props: SharedNodeProps): ReactNode => {
  const { type } = node;
  switch (type) {
    case "object":
    case "array": {
      return <ObjectNode {...props} node={node} />;
    }

    case "null":
    case "undefined":
    case "string":
    case "number":
    case "boolean": {
      return <PrimitiveNode {...props} node={node} />;
    }

    default: {
      assertNever(type);
    }
  }
};

const getKey = (id: string) => id.split(".").slice(-1)[0];

const Node: FC<NodeProps> = ({
  childHovered = false,
  expanded = false,
  focused = false,
  node,
  style,
  onHover,
  onMeasure,
  onClick,
}) => {
  const ref = useResizeObserver(({ height }) => onMeasure?.(height));
  const [hoverRef, hovered] = useHover<HTMLLIElement>({ onHover });
  const { focusVisible, ...focusProps } = useFocusVisible();

  const { id, type, depth } = node;
  const expandable = nodeIsExpandable(type);
  return (
    <li
      className={cx("main", {
        childHovered,
        expandable,
        expanded,
        focusVisible,
      })}
      style={{ ...style, "--depth": depth } as CSSProperties}
      ref={hoverRef}
      {...focusProps}
    >
      <button className={cx("button")} ref={ref} onClick={onClick}>
        {expandable && <Caret expanded={expanded} />}
        <label className={cx("label")}>{getKey(id)}:</label>
        {getNodeContent(node, { expanded, hovered })}
      </button>
    </li>
  );
};

export default Node;
