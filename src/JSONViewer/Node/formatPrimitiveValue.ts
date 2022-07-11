import { PrimitiveValueType } from "../types";

const formatPrimitiveValue = (
  value: unknown,
  type: PrimitiveValueType
): string => {
  switch (type) {
    case "string": {
      return JSON.stringify(value);
    }

    default: {
      return String(value);
    }
  }
};

export default formatPrimitiveValue;
