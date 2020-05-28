import { isNil, Nil } from '../utils';

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
  // value: T;
};

type MaybeFactory = <T>(val?: T) => Maybe<T>;

// export const map = <T, B>(
//   maybe: Maybe<T>,
//   fn: (val: NonNullable<T>) => B,
// ): Maybe<B> => maybe.map(fn);

export const maybe: MaybeFactory = (val) => ({
  map: (fn) => (isNil(val) ? maybe() : maybe(fn(val))),
  orElse: (elseValue) => (isNil(val) ? elseValue : val),
  apply: (otherMaybe) =>
    isNil(val) ? maybe(val as any) : otherMaybe.map((fn) => fn(val)),
  chain: (fn) => (isNil(val) ? maybe() : fn(val)),
  join: () => val,
  toString: () => `Maybe(${val})`,
  // value: val,
});

// ////////////////////////////////////////////////////////

export interface None {
  readonly _tag: 'None';
}

export interface Some<A> {
  readonly _tag: 'Some';
  readonly value: A;
}

export type Option<A> = None | Some<A>;

export const none: Option<never> = { _tag: 'None' };

export function some<A>(a: A): Option<A> {
  return { _tag: 'Some', value: a };
}

export function isNone<A>(fa: Option<A>): fa is None {
  // eslint-disable-next-line no-underscore-dangle
  return fa._tag === 'None';
}

export const getNullableValue = (): string | null => {
  const random = Math.random();

  return random >= 0.5 ? null : 'Some Value';
};

export function fromNullable<A>(a: A): Option<NonNullable<A>> {
  return a == null ? none : some(a as NonNullable<A>);
}

export function mapNullable2<A, B>(
  f: (a: A) => B | null | undefined,
): (ma: A) => Option<B> {
  return (ma) => (isNil(ma) ? none : fromNullable(f(ma)));
}

export function mapNullable<A, B>(
  f: (a: A) => B | null | undefined,
): (ma: Option<A>) => Option<B> {
  return (ma) => (isNone(ma) ? none : fromNullable(f(ma.value)));
}

const test = maybe('null').orElse(1);
// const test2 = map(test, () => '');
