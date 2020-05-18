import { isNil } from '../utils';

// export interface IMaybe<A> {
//   map<B>(f: (val: A) => B): IMaybe<B>;
//   toString: () => string;
// }

type Maybe<T> = {
  map: <B>(fn: (val: T) => B) => Maybe<B>;
  join: () => T | Nil;
  orElse: <B>(val: B) => B | T;
  apply: <B>(maybe: Maybe<(t: T) => B>) => Maybe<B>;
  /**
   * or flatMap
   */
  chain: <B>(fn: (val: T) => Maybe<B>) => Maybe<B>;
  toString: () => string;
};

type MaybeFactory = <T>(val?: T) => Maybe<T>;

export const map = <T, B>(
  maybe: Maybe<T>,
  fn: (val: NonNullable<T>) => B,
): Maybe<B> => maybe.map(fn);

export const maybe: MaybeFactory = (val) => ({
  map: (fn) => (isNil(val) ? maybe() : maybe(fn(val))),
  orElse: (elseValue) => (isNil(val) ? elseValue : val),
  apply: (otherMaybe) =>
    isNil(val) ? maybe(val as any) : otherMaybe.map((fn) => fn(val)),
  chain: (fn) => (isNil(val) ? maybe() : fn(val)),
  join: () => val,
  toString: () => `Maybe(${val})`,
});

const test = maybe('null').orElse(1);
const test2 = map(test, () => '');
