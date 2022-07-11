import { makeTrie } from "./Trie";
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
      trie.toggleExpanded(["root"]);

      expect(trie.children.root.expanded).toBe(true);
      expect(trie.children.root.children.a.expanded).toBe(false);

      trie.toggleExpanded(["root", "a"]);
      expect(trie.children.root.expanded).toBe(true);
      expect(trie.children.root.children.a.expanded).toBe(true);
    });
  });

  describe("nodeVisible", () => {
    it("works", () => {
      const nodes = getNodes(sample);
      const trie = makeTrie(nodes);
      expect(trie.nodeVisible(["root"])).toBe(true);
      expect(trie.nodeVisible(["root", "a"])).toBe(false);
      expect(trie.nodeVisible(["root", "a", "b"])).toBe(false);

      trie.toggleExpanded(["root"]);
      expect(trie.nodeVisible(["root", "a"])).toBe(true);
      expect(trie.nodeVisible(["root", "a", "b"])).toBe(false);
      expect(trie.nodeVisible(["root", "a", "b", "c"])).toBe(false);

      trie.toggleExpanded(["root", "a"]);
      expect(trie.nodeVisible(["root", "a"])).toBe(true);
      expect(trie.nodeVisible(["root", "a", "b"])).toBe(true);
      expect(trie.nodeVisible(["root", "a", "b", "c"])).toBe(false);
    });
  });
});
