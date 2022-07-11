import classNames from "classnames/bind";
import { FC, useRef, useState } from "react";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import useCallbackRef from "../hooks/useCallbackRef";
import { useDimensions } from "../ResizeObserver";
import styles from "./JSONViewer.module.scss";
import Node from "./Node";
import { DEAFAULT_THEME, getCSSVariables, Theme } from "./theme";
import useVisibleNodes from "./useVisibleNodes";

const cx = classNames.bind(styles);

export type JSONViewerProps = {
  value: unknown;
  theme?: Theme;
};

const DEFAULT_HEIGHT = 16;

const JSONViewer: FC<JSONViewerProps> = ({ value, theme = DEAFAULT_THEME }) => {
  const [{ width, height }, ref] = useDimensions();
  const listRef = useRef<VariableSizeList>(null);
  const heights = useRef<Record<string, number>>({});

  const [hoveredNode, setHoveredNode] = useState<null | string>(null);
  const [visibleNodes, onToggleNodeExpanded] = useVisibleNodes(value);

  const handleMouseLeave = useCallbackRef(() => setHoveredNode(null));

  const getItemSize = useCallbackRef((index: number) => {
    const { id } = visibleNodes[index];
    return heights.current[id] ?? DEFAULT_HEIGHT;
  });

  const getItemKey = useCallbackRef((index: number) => {
    return visibleNodes[index].id;
  });

  const handleMeasureNode = useCallbackRef(
    (height: number, index: number, id: string) => {
      heights.current[id] = height;
      listRef.current?.resetAfterIndex(index);
    }
  );

  const renderNode = useCallbackRef(
    ({ index, style }: ListChildComponentProps) => {
      const node = visibleNodes[index];
      const { id, expanded } = node;
      return (
        <Node
          key={id}
          style={style}
          expanded={expanded}
          node={node}
          childHovered={hoveredNode?.startsWith(id)}
          onHover={() => setHoveredNode(id)}
          onMeasure={(height) => handleMeasureNode(height, index, id)}
          onClick={() => onToggleNodeExpanded(id)}
        />
      );
    }
  );

  return (
    <div
      className={cx("main")}
      ref={ref}
      style={getCSSVariables(theme)}
      onMouseLeave={handleMouseLeave}
    >
      <VariableSizeList
        ref={listRef}
        itemKey={getItemKey}
        itemCount={visibleNodes.length}
        estimatedItemSize={DEFAULT_HEIGHT}
        itemSize={getItemSize}
        innerElementType="ol"
        className={cx("list")}
        width={width ?? 0}
        height={height ?? 0}
      >
        {renderNode}
      </VariableSizeList>
    </div>
  );
};

export default JSONViewer;
