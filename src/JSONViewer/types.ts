export type Selector = (number | string)[];

export type Primitive = string | number | boolean | null | undefined;

export type PrimitiveValueType =
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "undefined";

export type ValueType = PrimitiveValueType | "array" | "object";

export type CommonNode = {
  type: ValueType;
  id: string;
  depth: number;
};

export interface PrimitiveNode extends CommonNode {
  type: PrimitiveValueType;
  value: Primitive;
}

export interface ObjectNode extends CommonNode {
  type: "object" | "array";
  children: number;
}

export interface ArrayNode extends ObjectNode {
  type: "array";
}

export type Node = PrimitiveNode | ObjectNode | ArrayNode;
