export type StringLiteral<T> = T extends string
  ? string extends T
    ? never
    : T
  : never;

export type UnknownObject = Record<string, unknown>;

export type Selector = (string | number)[];
