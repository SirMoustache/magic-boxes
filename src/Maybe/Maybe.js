import { isNil, identity } from '../utils';

const Maybe = val => ({
  /**
   * Map over Maybe value
   */
  map: f => (isNil(val) ? Maybe(val) : Maybe(f(val))),
  /**
   * Get value from Maybe Monad
   */
  join: (f = identity) => f(val),
  /**
   * f => f(val) ??
   */
  chain: f =>
    isNil(val)
      ? Maybe(val)
      : Maybe(val)
          .map(f)
          .join(),
  /**
   * TODO
   */
  ap: () => null,
  /**
   * TODO
   */
  toString: () => `Maybe(${val})`,
});

export default Maybe;
