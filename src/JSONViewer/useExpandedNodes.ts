import { useState } from "react";
import useCallbackRef from "../hooks/useCallbackRef";
import useUpdateEffect from "../hooks/useUpdateEffect";
import { makeTrie, Trie } from "./Trie";
import { Node } from "./types";

const useExpandedNodes = (nodes: Node[]): [Trie, (id: string) => void] => {
  const [trie, setTrie] = useState(() => makeTrie(nodes));

  useUpdateEffect(() => {
    setTrie(makeTrie(nodes));
  }, [nodes]);

  const onToggleExpanded = useCallbackRef((id: string) => {
    const nextTrie = { ...trie };
    nextTrie.toggleExpanded(id.split("."));
    setTrie(nextTrie);
  });

  return [trie, onToggleExpanded];
};

export default useExpandedNodes;
