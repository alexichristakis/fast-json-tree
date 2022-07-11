import { Selector } from "../types";
import { Node } from "./types";

type Children = Record<string, TrieNode>;

export type TrieNode = {
  expanded?: boolean;
  children: Children;
};

export type Trie = {
  children: Children;
  nodeVisible: (selector: Selector) => boolean;
  toggleExpanded: (selector: Selector) => void;
  getExpanded: (selector: Selector) => boolean;
};

const makeNode = (expanded = true, children: Children = {}): TrieNode => ({
  expanded,
  children,
});

const makeNodeVisible = (children: Children) => {
  return (selector: Selector) => {
    const [root, ...path] = selector;

    let currentNode = children[root];
    for (const part of path) {
      if (!currentNode) {
        return true;
      }

      if (!currentNode.expanded) {
        return false;
      }

      currentNode = currentNode.children[part];
    }

    return true;
  };
};

const makeToggleExpanded = (children: Children) => {
  return (selector: Selector) => {
    const [root, ...path] = selector;

    let currentNode = children[root];
    for (const part of path) {
      currentNode = currentNode.children[part];
    }

    currentNode.expanded = !currentNode.expanded;
  };
};

const makeGetExpanded = (children: Children) => {
  return (selector: Selector) => {
    const [root, ...path] = selector;

    let currentNode = children[root];
    for (const part of path) {
      currentNode = currentNode.children[part];
    }

    return !!currentNode.expanded;
  };
};

export const makeTrie = (nodes: Node[]): Trie => {
  const children = nodes.reduce<Children>((trie, { id }) => {
    const selector = id.split(".");
    const [root, ...rest] = selector;

    // where to insert
    let rootNode = trie[root] ?? makeNode();

    // pointer
    let currentNode = rootNode;
    rest.forEach((id) => {
      currentNode.children[id] ??= makeNode();
      currentNode = currentNode.children[id] ?? makeNode();
    });

    trie[root] = rootNode;
    return trie;
  }, {});

  return {
    children,
    nodeVisible: makeNodeVisible(children),
    toggleExpanded: makeToggleExpanded(children),
    getExpanded: makeGetExpanded(children),
  };
};
