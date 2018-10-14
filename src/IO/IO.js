/**
 * IO Monad.
 * Lazy Monad that pushes dirty side effects for later.
 * Everything is clean until you run it.
 * @param {function} effect
 */
const IO = effect => ({
  /**
   * Will take a regular function and eventually apply it to our delayed value (Spoiler: run() method).
   */
  map: f => IO(x => f(effect(x))),
  /**
   * Triggers the effect
   */
  run: x => effect(x),
  /**
   * Same as run, but spelled differently
   */
  join: x => effect(x),
  /**
   * You may know this as chain, flatMap, bind (from Haskell, I don't know for sure, but people are talking).
   * Doing a regular mapping, then flattening out the result with .join().
   * Expects another IO as argument
   */
  chain: f =>
    IO(effect)
      .map(f)
      .join(),
});

/**
 * A shortcut for creating IO from single value
 */
IO.of = x => IO(() => x);
/**
 * A shortcut for creating IO
 */
IO.from = x => IO(x);

export default IO;
