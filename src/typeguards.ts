import { StringLiteral, UnknownObject } from "./types";

export function makeAssert<T>(check: (value: unknown) => value is T) {
  return (value: unknown): asserts value is T => {
    if (!check(value)) throw new Error("");
  };
}

export const isNumber = (value: unknown): value is number =>
  typeof value === "number";
export const assertIsNumber: (value: unknown) => asserts value is number =
  makeAssert(isNumber);

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";
export const assertIsBoolean: (value: unknown) => asserts value is boolean =
  makeAssert(isBoolean);

export const isString = (value: unknown): value is string =>
  typeof value === "string";
export const assertIsString: (value: unknown) => asserts value is string =
  makeAssert(isString);

export const assertArray: (value: unknown) => asserts value is unknown[] =
  makeAssert(Array.isArray);

export const assertNever = (value: never): null => {
  return value;
};

export const isPlainObject = (value: unknown): value is UnknownObject =>
  !!(value && typeof value === "object");

export const assertPlainObject: (
  value: unknown
) => asserts value is UnknownObject = makeAssert(isPlainObject);

export const isPlainObjectOrArray = (
  value: unknown
): value is UnknownObject | unknown[] =>
  isPlainObject(value) || Array.isArray(value);

export const assertPlainObjectOrArray: (
  value: unknown
) => asserts value is UnknownObject | unknown[] =
  makeAssert(isPlainObjectOrArray);

/**
 * A type guard for nullish values, primarily for use with `.filter` on arrays.
 *
 * @example arr.filter(isNotNullish)
 */
export function isNotNullish<T>(value: T | null | undefined): value is T {
  return value != null;
}

/**
 * A type guard to determine if `value` is one of the string literals in `arr`.
 *
 * Only for use with arrays of string literals. For other array types, use `Array.includes`.
 */
export function includes<T extends string>(
  arr: ReadonlyArray<StringLiteral<T>>,
  value: string,
  fromIndex?: number
): value is T {
  return arr.includes(value as StringLiteral<T>, fromIndex);
}

export const assertStringLiteral: <T extends string>(
  value: unknown,
  options: ReadonlyArray<StringLiteral<T>>
) => asserts value is T = (value, options) =>
  makeAssert(<T extends string>(val: unknown): val is T =>
    options.includes(value as any)
  )(value);

export const isPrimitive = (
  value: unknown
): value is string | boolean | number | null | undefined =>
  value == null || ["string", "boolean", "number"].includes(typeof value);

export const assertPrimitive: (
  value: unknown
) => asserts value is string | boolean | number | null | undefined =
  makeAssert(isPrimitive);
