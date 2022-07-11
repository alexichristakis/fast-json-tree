import { useMemo } from "react";
import { assertArray, assertPlainObject, assertPrimitive } from "../typeguards";
import getValueType from "./getValueType";
import { ArrayNode, Node, ObjectNode, PrimitiveNode } from "./types";

export const getNodes = (value: unknown, id = "root", depth = 0): Node[] => {
  const type = getValueType(value);
  switch (type) {
    case "array": {
      assertArray(value);
      const node: ArrayNode = {
        type,
        id,
        depth,
        children: value.length,
      };

      return ([node] as Node[]).concat(
        value.flatMap((value, i) => getNodes(value, `${id}.${i}`, depth + 1))
      );
    }

    case "object": {
      assertPlainObject(value);
      const entries = Object.entries(value);
      const node: ObjectNode = {
        type,
        id,
        depth,
        children: entries.length,
      };

      return [node as Node].concat(
        entries.flatMap(([key, value]) =>
          getNodes(value, `${id}.${key}`, depth + 1)
        )
      );
    }

    case "boolean":
    case "number":
    case "null":
    case "undefined":
    case "string": {
      assertPrimitive(value);
      const node: PrimitiveNode = {
        type,
        depth,
        id,
        value,
      };

      return [node];
    }
  }
};

const useNodes = (value: unknown): Node[] => {
  return useMemo(() => getNodes(value, "root"), [value]);
};

export default useNodes;
