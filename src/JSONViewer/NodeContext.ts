import { createContext } from "react";
import { NodeWithExpanded } from "./types";

export type NodeContextShape = {
  visibleNodes: NodeWithExpanded[];
  hoveredNode: string | null;
  onClickNode?: (id: string) => void;
  onHoverNode?: (id: string) => void;
  onMeasureNode?: (index: number, height: number) => void;
};

const NodeContext = createContext<NodeContextShape>({
  visibleNodes: [],
  hoveredNode: null,
});

export default NodeContext;
