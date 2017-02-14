/* @flow */
export const curry = (fn: function, ...args: any) => {
  let c = (args) =>
    args.length < fn.length
      ? (..._args: any) => c([ ...args, ..._args ])
      : fn(...args);
  return c(args);
};

export const compose = (...fns: any) => fns.reduce((f, g) => (...args) => f(g(...args)));
export const includes = curry((arr: Array<any>, val: any): boolean => arr.includes(val));
export const optionsString = (arr: Array<string>): string => arr.reduce((a, b) => a.concat(b), '').replace(/,/g, '');
export const makeOptions = (options: Array<string> | string ): string =>
  Array.isArray(options)
    ? optionsString(options)
    : optionsString([ options ]);

export const K = (fn: function) => (x: any) => (fn(x), x);
export const randomString = (): string => Math.random().toString(36).substr(2, 5);

// Error handling
export const requiredError = (val: string) => {
  throw new Error(`Please provide a value for ${val}`);
};
