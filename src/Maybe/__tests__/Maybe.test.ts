import Maybe from '../Maybe';

const addOne = (x: number) => x + 1;

describe('Maybe  Monad', () => {
  it('Maybe exist', () => expect(Maybe).toBeDefined());

  it('map() method is working', () =>
    expect(Maybe(1).map(addOne).join()).toBe(2));

  it('multiple map() methods are working', () =>
    expect(Maybe(1).map(addOne).map(addOne).join()).toBe(3));
});
