import { makeNodeVisible, makeToggleExpanded, makeTrie } from "./Trie";
import { getNodes } from "./useNodes";

const sample = { a: { b: { c: { d: "hi" } } } };

describe("Trie", () => {
  describe("makeTrie", () => {
    //

    it("makes a trie", () => {
      const nodes = getNodes(sample);
      const { children } = makeTrie(nodes);
      const { root } = children;
      expect(root).toBeDefined();
      expect(root.children.a).toBeDefined();
      expect(root.children.a.children.b).toBeDefined();
      expect(root.children.a.children.b.children.c).toBeDefined();
      expect(root.children.a.children.b.children.c.children.d).toBeDefined();
    });
  });

  describe("toggleExpanded", () => {
    it("works", () => {
      const nodes = getNodes(sample);
      const trie = makeTrie(nodes);
      const toggleExpanded = makeToggleExpanded(trie.children);
      toggleExpanded(["root"]);

      expect(trie.children.root.expanded).toBe(true);
      expect(trie.children.root.children.a.expanded).toBe(false);

      toggleExpanded(["root", "a"]);
      expect(trie.children.root.expanded).toBe(true);
      expect(trie.children.root.children.a.expanded).toBe(true);
    });
  });

  describe("nodeVisible", () => {
    it("works", () => {
      const nodes = getNodes(sample);
      const trie = makeTrie(nodes);
      const nodeVisible = makeNodeVisible(trie.children);
      const toggleExpanded = makeToggleExpanded(trie.children);

      expect(nodeVisible(["root"])).toBe(true);
      expect(nodeVisible(["root", "a"])).toBe(false);
      expect(nodeVisible(["root", "a", "b"])).toBe(false);

      toggleExpanded(["root"]);
      expect(nodeVisible(["root", "a"])).toBe(true);
      expect(nodeVisible(["root", "a", "b"])).toBe(false);
      expect(nodeVisible(["root", "a", "b", "c"])).toBe(false);

      toggleExpanded(["root", "a"]);
      expect(nodeVisible(["root", "a"])).toBe(true);
      expect(nodeVisible(["root", "a", "b"])).toBe(true);
      expect(nodeVisible(["root", "a", "b", "c"])).toBe(false);
    });
  });
});
