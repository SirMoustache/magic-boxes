import IO from '../IO';

const addFoo = x => `${x} foo`;
const addBar = x => `${x} bar`;

describe('IO  Monad', () => {
  test('IO exist', () => expect(IO).toBeDefined());

  test('run() method works', () => expect(IO(x => x).run('run')).toBe('run'));

  test('of() method works', () =>
    expect(IO.of('of course!').run()).toBe('of course!'));

  test('from() method works', () =>
    expect(IO.from(x => x).run('From')).toBe('From'));

  test('map() method works from', () =>
    expect(
      IO(x => x)
        .map(addFoo)
        .map(addBar)
        .run('map'),
    ).toBe('map foo bar'));
});
