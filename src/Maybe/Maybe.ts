import { isNil, identity } from '../utils';

// interface Filter {
//   <T>(fn: (value: T) => boolean): FilterOnceApplied<T>;
//   <T, Kind extends 'array'>(fn: (value: T) => boolean): (list: ReadonlyArray<T>) => T[];
//   <T, Kind extends 'object'>(fn: (value: T) => boolean): (list: Dictionary<T>) => Dictionary<T>;
//   <T>(fn: (value: T) => boolean, list: ReadonlyArray<T>): T[];
//   <T>(fn: (value: T) => boolean, obj: Dictionary<T>): Dictionary<T>;
// }

interface FunctionalMaybe {
  <T>(value: T): Maybe<T>;
}

// export class IMaybe<T> {
//   //map: (f: Function) => Maybe<T>(f(T));
//   map: <B>(f: (val: T) => B) => Maybe<B> | Maybe<T>;
//   join: (f?: (val: T) => any) => any;
//   chain: (val: T) => unknown;
//   ap: (b: any) => any;
//   toString: () => string;
//   static of: <B>(value: B) => Maybe<B>;
// }

export type MaybeFactory = (
  val: any,
) => {
  map: <B>(f: (val: any) => B) => Maybe<B>;
  // join: (f?: (val: T) => any) => any;
  // chain: (val: T) => unknown;
  // ap: (b: any) => any;
  // toString: () => string;
};

export type Maybe<T> = {
  // map: (f: Function) => Maybe<T>(f(T));
  map: <B>(f: (val: T) => B) => Maybe<B>;
  join: <B>(f: (val: T) => B) => B;
  // chain: <B>(f: (val: T) => B) => Maybe<B> | Maybe<T>;
  ap: <B>(b: Maybe<B>) => Maybe<B>;
  toString: () => string;
  // Static methods
  // of: <B>(value: B) => Maybe<B>;
};

export type MaybeStatic = {
  of: <B>(value: B) => Maybe<B>;
};

// export type TestMaybe = (val: any) => {};

// export type map = <T, B>(f: (val: T) => B) => Maybe<B> | Maybe<T>;
export type mapper = <T, B>(val: T) => B;
export type fn<T, B> = (val: T) => B;
export type joinFn<T> = (f?: (val: T) => any) => any;

const Maybe: FunctionalMaybe = <T>(val: T) => ({
  /**
   * Map over Maybe value
   */
  map: <B>(f: (val: T) => B) => (isNil(val) ? Maybe(val) : Maybe(f(val))),
  // map: <B>(f: (val: T) => B): Maybe<T> =>
  //   isNil(val) ? Maybe(val) : Maybe(f(val)),
  // map: <B>(f: (val: T) => B): Maybe<B> | Maybe<T> =>
  //   isNil(val) ? Maybe(val) : Maybe(f(val)),
  /**
   * Get value from Maybe Monad
   * Also known as fold
   */
  // join: (f = identity) => f(val),
  join: <B>(f: (val: T) => B) => f(val),
  /**
   * f => f(val) ??
   */
  // chain: <B>(f: (val: T) => B) =>
  //   isNil(val)
  //     ? Maybe(val)
  //     : Maybe(val)
  //         .map(f)
  //         .join(),
  /**
   * TODO
   * Maybe1(func).ap(Maybe2(value))
   * F(x).map(f) === F(f).ap(F(x))
   */
  ap: <B>(b: Maybe<B>) => b.map(val),
  /**
   * TODO
   */
  toString: () => `Maybe(${val})`,
});

// Maybe.of = <T>(x: T) => Maybe(x);

// Maybe(213).map(val => val.);
Maybe(213)
  .map(val => val.toString())
  .map(val => val);
// Maybe('ssffse')
//   .map(val => val.toUpperCase())
//   .map(val => val.trim());

export default Maybe;
