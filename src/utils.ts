export type Nil = null | undefined;

/**
 * Checks if value is null or undefined
 * @param {any} val value to check
 */
export const isNil = (val: unknown): val is Nil =>
  val === null || val === undefined;

/**
 * A function that returns value it receives
 * @param {any} val Any value
 */
export const identity = <T>(val: T) => val;
