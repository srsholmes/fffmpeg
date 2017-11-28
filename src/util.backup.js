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

export const includes = curry((arr: Array<any>, val: any): boolean => arr.includes(val));

export const optionsString = (arr: Array<string>): string => arr.reduce((a, b) => a.concat(b), '').replace(/,/g, '');

export const makeOptions = (options: Array<string> | string): string =>
  Array.isArray(options)
    ? optionsString(options)
    : optionsString([ options ]);
