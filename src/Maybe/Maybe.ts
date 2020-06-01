import { isNil, Nil } from '../utils';

export interface Some<T> {
  map<B>(fn: (val: T) => B): Maybe<B>;
  orElse<B>(elseFn: () => B | T): B | T;
  join(): T | Nil;
}

export interface Lazy<A> {
  (): A;
}

export interface Maybe<T> {
  /**
   * https://github.com/fantasyland/fantasy-land#functor
   */
  map: <B>(fn: (val: T) => B) => Maybe<B>;
  orElse: <B>(elseFn: () => B | T) => B | T;
  /**
   * Alternative names: flatMap, bind, chain
   */
  flatMap: <B>(fn: (val: T) => Maybe<B>) => Maybe<B>;
  /**
   * Get value from Maybe
   * Alternative names: emit, value, valueOf
   */
  join: () => T | Nil;
  /**
   * Apply value to another monad containing a function
   * https://github.com/fantasyland/fantasy-land#applicative
   */
  apply<B, C>(m: Maybe<(val: T) => C>): Maybe<C>;
  fork: <B>(left: () => B, right: (val: T) => B) => B;
  toString: () => string;
}

type MaybeFactory = <T>(val?: T) => Maybe<T>;

export const map = <T, B>(
  maybe: Maybe<T>,
  fn: (val: NonNullable<T>) => B,
): Maybe<B> => maybe.map(fn);

export const maybe: MaybeFactory = <T>(val?: T): Maybe<T> => ({
  map: (fn) => (isNil(val) ? maybe() : maybe(fn(val))),
  flatMap: (fn) => (isNil(val) ? maybe() : fn(val)),
  orElse: (elseFn) => (isNil(val) ? elseFn() : val),
  join: () => (isNil(val) ? undefined : val),
  apply: (m) => (isNil(val) ? maybe() : m.map((f) => f(val))),
  fork: (left, right) => (isNil(val) ? left() : right(val)),
  toString: () => `Maybe(${val})`,
});
