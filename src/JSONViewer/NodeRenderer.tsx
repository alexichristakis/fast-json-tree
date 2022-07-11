import { CSSProperties, FC } from "react";
import Node from "./Node";
import { Node as NodeType } from "./types";
import useNode from "./useNode";

type NodeRendererProps = {
  style?: CSSProperties;
  index: number;
  node: NodeType;
};

const NodeRenderer: FC<NodeRendererProps> = ({ node, index, style }) => {
  const props = useNode(node, index);
  return <Node style={style} {...props} />;
};

export default NodeRenderer;
