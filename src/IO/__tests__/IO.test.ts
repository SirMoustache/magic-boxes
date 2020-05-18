import IO from '../IO';

const addFoo = (x: any) => `${x} foo`;
const addBar = (x: any) => `${x} bar`;

describe('IO  Monad', () => {
  it('IO exist', () => expect(IO).toBeDefined());

  it('run() method works', () =>
    expect(IO((x: any) => x).run('run')).toBe('run'));

  it('of() method works', () =>
    expect(IO.of('of course!').run()).toBe('of course!'));

  it('from() method works', () =>
    expect(IO.from((x: any) => x).run('From')).toBe('From'));

  it('map() method works from', () =>
    expect(
      IO((x: any) => x)
        .map(addFoo)
        .map(addBar)
        .run('map'),
    ).toBe('map foo bar'));
});
