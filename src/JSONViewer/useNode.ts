import { useContext } from "react";
import { NodeProps } from "./Node/Node";
import NodeContext from "./NodeContext";
import { Node } from "./types";

const useNode = (node: Node, index: number): NodeProps => {
  const { visibleNodes, onClickNode, onHoverNode, onMeasureNode } =
    useContext(NodeContext);

  const { id } = node;
  const { expanded } = visibleNodes[index];
  return {
    expanded,
    node,
    onClick: () => onClickNode?.(id),
    onMeasure: (height: number) => onMeasureNode?.(index, height),
    onHover: () => onHoverNode?.(id),
  };
};

export default useNode;
