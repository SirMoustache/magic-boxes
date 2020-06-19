import { isNil, Nil } from '../utils';

export interface Task<T> {
  toString: () => string;
  map: <B>(fn: (val: T) => B) => Task<B>;
}

type FactoryCallback<T> = (
  onSucces: (val: T) => void,
  onError: (val: T) => void,
) => void;

type TaskFactory = <T>(callback: FactoryCallback<T>) => Task<T>;

const t = Promise.resolve('sdfsd');
const t2 = new Promise((suc) => {
  suc('asda');
});

t2.then((val) => console.log(val));

export const task: TaskFactory = (callback) => {
  return {
    toString: () => `Task(${callback})`,
    map: (fn) => {
      return task((res, rej) => {
        callback(
          (resolveVal) => res(fn(resolveVal)),
          (rejVal) => rej(fn(rejVal)),
        );
      });
    },
  };
};
