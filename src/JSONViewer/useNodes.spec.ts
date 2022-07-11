import { getNodes } from "./useNodes";

describe("useNodes", () => {
  describe("getNodes", () => {
    it("generates a flat list of nodes", () => {
      const nodes = getNodes({ nested: { nested: { nested: "hello!" } } });

      expect(nodes.length).toBe(4);
      expect(nodes.reduce((max, { depth }) => Math.max(max, depth), 0)).toBe(3);

      // unique ids
      const ids = nodes.map(({ id }) => id);
      expect(ids.length).toBe(new Set(ids).size);
    });
  });
});
