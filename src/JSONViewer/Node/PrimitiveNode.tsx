import classNames from "classnames/bind";
import { FC } from "react";
import { PrimitiveNode as PrimitiveNodeType } from "../types";
import styles from "./PrimitiveNode.module.scss";
import formatPrimitiveValue from "./formatPrimitiveValue";
import { SharedNodeProps } from "./types";

const cx = classNames.bind(styles);

export type PrimitiveNodeProps = {
  node: PrimitiveNodeType;
} & SharedNodeProps;

const PrimitiveNode: FC<PrimitiveNodeProps> = ({
  expanded = false,
  hovered = false,
  node,
}) => {
  const { value, type } = node;
  console.log({ expanded });
  return (
    <div className={cx("main", type, { expanded })}>
      {formatPrimitiveValue(value, type)}
    </div>
  );
};

export default PrimitiveNode;
