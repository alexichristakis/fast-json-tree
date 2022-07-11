import { useContext } from "react";
import useCallbackRef from "../hooks/useCallbackRef";
import { NodeProps } from "./Node/Node";
import NodeContext from "./NodeContext";
import { Node } from "./types";

const useNode = (node: Node, index: number): NodeProps => {
  const { visibleNodes, onClickNode, onHoverNode, onMeasureNode } =
    useContext(NodeContext);

  const { id } = node;
  const { expanded } = visibleNodes[index];

  const handleClick = useCallbackRef(() => onClickNode?.(id));

  const handleMeasure = useCallbackRef((height: number) =>
    onMeasureNode?.(index, height)
  );

  const handleHover = useCallbackRef(() => onHoverNode?.(id));

  return {
    expanded,
    node,
    onClick: handleClick,
    onMeasure: handleMeasure,
    onHover: handleHover,
  };
};

export default useNode;
