import { maybe } from '../Maybe';

const addOne = (x: number): number => x + 1;

const nullableNumber = (): null | number => null;

describe('maybe  Monad', () => {
  it('should exist', () => {
    expect(maybe).toBeDefined();
  });

  it('should return maybe', () => {
    const maybeOne = maybe(1);
    expect(maybeOne.toString()).toBe('Maybe(1)');
  });

  it('should handle null value', () => {
    expect(maybe(nullableNumber()).map(addOne).join()).toBe(undefined);
  });

  it('should map() value', () => {
    expect(maybe(1).map(addOne).join()).toBe(2);
  });

  it('should map() value multiple times', () => {
    expect(maybe(1).map(addOne).map(addOne).join()).toBe(3);
  });

  it('should fork value with right', () => {
    const left = jest.fn();
    const right = jest.fn();
    maybe('Some value').fork(left, right);

    expect(right).toBeCalledWith('Some value');
    expect(left).not.toBeCalled();
  });

  it('should fork null with left', () => {
    const left = jest.fn();
    const right = jest.fn();
    maybe(null).fork(left, right);

    expect(left).toBeCalled();
    expect(right).not.toBeCalled();
  });
});
