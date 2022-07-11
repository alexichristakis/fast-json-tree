import { useMemo } from "react";
import { Node } from "./types";
import useExpandedNodes from "./useExpandedNodes";
import useNodes from "./useNodes";

type NodeWithExpanded = Node & { expanded: boolean };

const useVisibleNodes = (
  value: unknown
): [NodeWithExpanded[], (id: string) => void] => {
  const nodes = useNodes(value);
  const [trie, onToggleExpanded] = useExpandedNodes(nodes);

  const visibleNodes = useMemo((): NodeWithExpanded[] => {
    const visibleNodes: NodeWithExpanded[] = [];
    for (const node of nodes) {
      const { id } = node;
      const selector = id.split(".");
      if (trie.nodeVisible(selector)) {
        visibleNodes.push({ ...node, expanded: trie.getExpanded(selector) });
      }
    }

    return visibleNodes;
  }, [nodes, trie]);

  return [visibleNodes, onToggleExpanded];
};

export default useVisibleNodes;
