import { ValueType } from "./types";

const getValueType = (value: unknown): ValueType => {
  if (Array.isArray(value)) {
    return "array";
  } else if (value && typeof value === "object") {
    return "object";
  } else if (typeof value === "number") {
    return "number";
  } else if (typeof value === "string") {
    return "string";
  } else if (value === null) {
    return "null";
  } else if (value === undefined) {
    return "undefined";
  } else if (typeof value === "boolean") {
    return "boolean";
  }

  return "array";
};

export default getValueType;
