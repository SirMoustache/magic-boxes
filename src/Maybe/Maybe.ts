import { isNil, identity } from '../utils';

// interface Filter {
//   <T>(fn: (value: T) => boolean): FilterOnceApplied<T>;
//   <T, Kind extends 'array'>(fn: (value: T) => boolean): (list: ReadonlyArray<T>) => T[];
//   <T, Kind extends 'object'>(fn: (value: T) => boolean): (list: Dictionary<T>) => Dictionary<T>;
//   <T>(fn: (value: T) => boolean, list: ReadonlyArray<T>): T[];
//   <T>(fn: (value: T) => boolean, obj: Dictionary<T>): Dictionary<T>;
// }

// interface FunctionalMaybe {
//   <T>(value: T): IMaybe<T>;
// }

// export class IMaybe<T> {
//   //map: (f: Function) => Maybe<T>(f(T));
//   map: <B>(f: (val: T) => B) => Maybe<B> | Maybe<T>;
//   join: (f?: (val: T) => any) => any;
//   chain: (val: T) => unknown;
//   ap: (b: any) => any;
//   toString: () => string;
//   static of: <B>(value: B) => Maybe<B>;
// }

// export type MaybeFactory = (
//   val: any,
// ) => {
//   map: <B>(f: (val: any) => B) => IMaybe<B>;
//   // join: (f?: (val: T) => any) => any;
//   // chain: (val: T) => unknown;
//   // ap: (b: any) => any;
//   // toString: () => string;
// };

// export type Maybe<T> = {
//   // map: (f: Function) => Maybe<T>(f(T));
//   map: <B>(f: (val: T) => B) => Maybe<B>;
//   // join: <B>(f: (val: T) => B) => B;
//   // chain: <B>(f: (val: T) => B) => Maybe<B>;
//   // chain: <B>(f: (val: T) => B) => Maybe<B> | Maybe<T>;
//   // ap: <B>(b: Maybe<B>) => Maybe<B>;
//   toString: () => string;
//   // Static methods
//   // of: <B>(value: B) => Maybe<B>;
// };

export interface IMaybe<A> {
  map<B>(f: (val: NonNullable<A>) => B): IMaybe<B>;
  join(): A | undefined;
  orElse<B>(b: NonNullable<B>): A | B;
  chain<B>(f: (a: A) => IMaybe<B>): IMaybe<B>;
  // ap(b: IMaybe<any>): IMaybe<any>;
  // ap(b: any): any;
  toString: () => string;

  // map<B>(f: (_: A) => B): IMaybe<B>;
  // apply<A, B>(this: IMaybe< >, f: IMaybe<A>): IMaybe<B>;
  // as NonNullable<(_: A) => B>
  // apply<A, B>(v: IMaybe<A>): IMaybe<B>;
  apply<B, C>(b: IMaybe<B>): IMaybe<C>;
  // apply<A, B>(f: IMaybe<A>): IMaybe<B>;
}

// export type MaybeStatic = {
//   of: <B>(value: B) => Maybe<B>;
// };

// export type TestMaybe = (val: any) => {};

// export type map = <T, B>(f: (val: T) => B) => Maybe<B> | Maybe<T>;
export type mapper = <T, B>(val: T) => B;
export type transform<A, B> = (val: NonNullable<A>) => B;
export type joinFn<T> = (f?: (val: T) => any) => any;

export type func<A, B> = NonNullable<(a: NonNullable<A>) => B>;

// const exampleMap = <T>(value?: T) => <R>(fn: (t: NonNullable<T>) => R) =>
//   isNil(value) ? Maybe<R>() : Maybe<R>(fn(value as NonNullable<T>));

export const makeMap = <A>(val?: A) => <B>(f: (a: NonNullable<A>) => B) =>
  isNil(val) ? Maybe<B>() : Maybe<B>(f(val as NonNullable<A>));

export const makeJoin = <A>(val?: A) => () =>
  isNil(val) ? val : (val as NonNullable<A>);

export const makeOrElse = <A>(val?: A) => <B>(b: NonNullable<B>) =>
  isNil(val) ? b : (val as NonNullable<A>);

export const makeChain = <A>(val?: A) => <B>(
  f: (a: NonNullable<A>) => IMaybe<B>,
) => (isNil(val) ? Maybe<B>() : f(val as NonNullable<A>));

export const makeAp = <A, B>(val?: (a: NonNullable<A>) => B) => (
  b: IMaybe<any>,
) => (isNil(val) ? b : b.map(val as NonNullable<(a: NonNullable<A>) => B>));

// export const makeApply = <A, B>(val?: any) => (b: IMaybe<any>) =>
//   isNil(val) ? b : b.map(val as NonNullable<(a: NonNullable<A>) => B>);

export const makeApply = <A>(val?: any) => <B, C>(b: IMaybe<B>) =>
  isNil(val) ? Maybe<C>() : b.map(val as NonNullable<(a: any) => C>);

const Maybe = <A>(val?: A): IMaybe<A> => ({
  /**
   * Map over Maybe value
   */
  map: makeMap(val),
  // map: <B>(f: (val: T) => B) => (isNil(val) ? Maybe(val) : Maybe(f(val))),
  // map: <B>(f: (val: T) => B): Maybe<T> =>
  //   isNil(val) ? Maybe(val) : Maybe(f(val)),
  // map: <B>(f: (val: T) => B): Maybe<B> | Maybe<T> =>
  //   isNil(val) ? Maybe(val) : Maybe(f(val)),
  /**
   * Get value from Maybe Monad
   * Also known as fold
   */
  // join: (f = identity) => f(val),
  // join: <B>(f: (val: T) => B) => f(val),
  join: makeJoin(val),
  /**
   * f => f(val) ??
   * chain: f => Maybe(f(val)).join(), or
   * flatMap
   * Maybe(Maybe(val)).join() === Maybe(val)
   * f => f(val) ??
   */
  /**
   * orElse
   */
  orElse: makeOrElse(val),
  chain: makeChain(val),
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
   * or b => b.map(f => f(val))???
   * or b => b(f => f(val))
   * or <B>(b: Maybe<B>) => b.map(val),
   */
  // ap: makeAp(val),
  apply: makeApply(val),
  /**
   * TODO
   */
  toString: () => `Maybe(${val})`,
});

// Maybe.of = <T>(x: T) => Maybe(x);

// Maybe(213).map(val => val.);
// Maybe(213)
//   .map(val => val.toString())
//   .map(val => val);
// Maybe('ssffse')
//   .map(val => val.toUpperCase())
//   .map(val => val.trim());

let test = Maybe<number>()
  .map((val) => val.toString())
  .map((val) => val.toUpperCase())
  .orElse('1');
//.join();

let test2 = Maybe((x: number) => x.toString())
  .apply(Maybe(3))
  .map((val) => val);

let test3 = Maybe((x: number) => x + 1)
  .map((val) => val(3))
  .map((val) => val);

test;

export default Maybe;
