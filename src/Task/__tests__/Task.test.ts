import { task } from '../Task';

const addOne = (x: number): number => x + 1;

const nullableNumber = (): null | number => null;

describe('task  Monad', () => {
  it('should exist', () => {
    expect(task).toBeDefined();
  });

  it('should be able to map', (done) => {
    const mapFn = jest.fn();
    const taskOne = task((onSucces, onError) => {
      Promise.resolve(123).then((val) => {
        onSucces(val);
      });
    });
    taskOne.map(mapFn).map(() => done());
    expect(mapFn).toBeCalledWith(123);
  });
});
