import { useMemo } from "react";
import { makeGetExpanded, makeNodeVisible } from "./Trie";
import { NodeWithExpanded } from "./types";
import useExpandedNodes from "./useExpandedNodes";
import useNodes from "./useNodes";

const useVisibleNodes = (
  value: unknown
): [NodeWithExpanded[], (id: string) => void] => {
  const nodes = useNodes(value);
  const [trie, onToggleExpanded] = useExpandedNodes(nodes);

  const visibleNodes = useMemo((): NodeWithExpanded[] => {
    const visibleNodes: NodeWithExpanded[] = [];
    const { children } = trie;

    const nodeVisible = makeNodeVisible(children);
    const getExpanded = makeGetExpanded(children);

    for (const node of nodes) {
      const { id } = node;
      const selector = id.split(".");
      if (nodeVisible(selector)) {
        visibleNodes.push({ ...node, expanded: getExpanded(selector) });
      }
    }

    return visibleNodes;
  }, [nodes, trie]);

  return [visibleNodes, onToggleExpanded];
};

export default useVisibleNodes;
