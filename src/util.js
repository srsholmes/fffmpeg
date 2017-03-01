/* @flow */
export const curry = (fn: any, ...args: any) => {
  let c = (args) =>
    args.length < fn.length
      ? (..._args: any) => c([ ...args, ..._args ])
      : fn(...args);
  return c(args);
};

export const promisify = (fn) => (...x) =>
  new Promise((resolve, reject) => {
    fn(...x, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    })
  });

export const compose = (...fns: any) => fns.reduce((f, g) => (...args) => f(g(...args)));

export const includes = curry((arr: Array<any>, val: any): boolean => arr.includes(val));

export const includedFormat = curry((arr: Array<any>, val: string): any => {
  if (includes(arr)(val)) {
    throw new Error('Specified format not support');
  } else {
    return val;
  }
});

export const optionsString = (arr: Array<string>): string => arr.reduce((a, b) => a.concat(b), '').replace(/,/g, '');

export const makeOptions = (options: Array<string> | string): string =>
  Array.isArray(options)
    ? optionsString(options)
    : optionsString([ options ]);

export const concatWithSpace = curry((a, b): string => `${a} ${b}`);

export const makeFileName = curry((a, b): string => `${a}.${b}`);

export const K = (fn: any) => (x: any) => (fn(x), x);

export const randomString = (): string => Math.random().toString(36).substr(2, 5);

export const toLowerCase = (str: string): string => str.toLowerCase();
// Error handling
export const requiredError = (val: string) => {
  throw new Error(`Please provide a value for ${val}`);
};
