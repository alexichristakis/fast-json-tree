import { Key, Ref, useMemo, useRef, useState } from "react";
import { VariableSizeList } from "react-window";
import useCallbackRef from "../hooks/useCallbackRef";
import { useDimensions } from "../ResizeObserver";
import setMultipleRefs from "../setMultipleRefs";
import { NodeContextShape } from "./NodeContext";
import { Node } from "./types";
import useVisibleNodes from "./useVisibleNodes";

const DEFAULT_HEIGHT = 16;

type Return = {
  ref: Ref<HTMLDivElement>;
  listRef: Ref<VariableSizeList>;
  visibleNodes: Node[];
  getItemSize: (index: number) => number;
  getItemKey: (index: number) => Key;
  nodeContext: NodeContextShape;
  width: number;
  height: number;
};

const useTree = (value: unknown, defaultHeight = DEFAULT_HEIGHT): Return => {
  const [{ width, height }, measureRef] = useDimensions();
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<VariableSizeList>(null);
  const heights = useRef<Record<string, number>>({});

  const [hoveredNode, setHoveredNode] = useState<null | string>(null);
  const [visibleNodes, onToggleNodeExpanded] = useVisibleNodes(value);

  const getItemSize = useCallbackRef((index: number) => {
    const { id } = visibleNodes[index];
    return heights.current[id] ?? defaultHeight;
  });

  const getItemKey = useCallbackRef((index: number) => {
    return visibleNodes[index].id;
  });

  const handleMeasureNode = useCallbackRef((index: number, height: number) => {
    const { id } = visibleNodes[index];
    heights.current[id] = height;
    listRef.current?.resetAfterIndex(index);
  });

  const handleClickNode = useCallbackRef((id: string) => {
    onToggleNodeExpanded(id);
    const index = visibleNodes.findIndex((node) => node.id === id);
    listRef.current?.resetAfterIndex(index);
  });

  const nodeContext = useMemo(
    (): NodeContextShape => ({
      visibleNodes,
      hoveredNode,
      onClickNode: handleClickNode,
      onHoverNode: setHoveredNode,
      onMeasureNode: handleMeasureNode,
    }),
    [
      hoveredNode,
      visibleNodes,
      handleClickNode,
      setHoveredNode,
      handleMeasureNode,
    ]
  );

  return {
    ref: setMultipleRefs(measureRef, ref),
    listRef,
    visibleNodes,
    getItemSize,
    getItemKey,
    nodeContext,
    width: width ?? 0,
    height: height ?? 0,
  };
};

export default useTree;
