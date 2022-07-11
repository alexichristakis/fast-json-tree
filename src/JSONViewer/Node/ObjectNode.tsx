import { FC } from "react";
import { ObjectNode as ObjectNodeType } from "../types";
import { SharedNodeProps } from "./types";
import styles from "./ObjectNode.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export type ObjectNodeProps = {
  node: ObjectNodeType;
} & SharedNodeProps;

const ObjectNode: FC<ObjectNodeProps> = ({ expanded = false, node }) => {
  const { type, children } = node;
  return (
    <div className={cx("main")}>
      {type === "array" ? "[]" : "{}"} {children}{" "}
      {type === "array" ? "items" : "keys"}
    </div>
  );
};

export default ObjectNode;
