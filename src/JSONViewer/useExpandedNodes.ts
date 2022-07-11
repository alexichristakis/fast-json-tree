import { useState } from "react";
import useCallbackRef from "../hooks/useCallbackRef";
import useUpdateEffect from "../hooks/useUpdateEffect";
import { makeToggleExpanded, makeTrie, Trie } from "./Trie";
import { Node } from "./types";
import produce from "immer";

const useExpandedNodes = (nodes: Node[]): [Trie, (id: string) => void] => {
  const [trie, setTrie] = useState(() => makeTrie(nodes));

  useUpdateEffect(() => {
    setTrie(makeTrie(nodes));
  }, [nodes]);

  const onToggleExpanded = useCallbackRef((id: string) => {
    const selector = id.split(".");
    setTrie(
      produce(({ children }) => {
        makeToggleExpanded(children)(selector);
      })
    );
  });

  return [trie, onToggleExpanded];
};

export default useExpandedNodes;
