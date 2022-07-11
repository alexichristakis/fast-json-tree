import { CSSProperties } from "react";
import { PrimitiveValueType } from "./types";

export type Theme = {
  caret: string;
} & Record<PrimitiveValueType, string>;

export const DEAFAULT_THEME: Theme = {
  caret: "black",
  string: "green",
  number: "orange",
  boolean: "blueviolet",
  null: "crimson",
  undefined: "crimson",
};

export const getCSSVariables = (theme: Theme): CSSProperties => {
  return Object.fromEntries(
    Object.entries(theme).map(([key, value]) => [`--${key}-color`, value])
  ) as CSSProperties;
};
