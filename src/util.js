export const curry = (fn, ...args) => {
  let c = (args) =>
    args.length < fn.length
      ? (..._args) => c([...args, ..._args])
      : fn(...args);
  return c(args);
};

export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

export const includes = curry((arr, val) => arr.includes(val));
export const optionsString = arr => arr.reduce((a, b) => a.concat(b), '').replace(/,/g, '');
export const makeOptions = options =>
  Array.isArray(options)
    ? optionsString(options)
    : optionsString([options]);

export const K = fn => x => (fn(x), x);
export const randomString = () => Math.random().toString(36).substr(2, 5);

// Error handling
export const requiredError = val => {
  throw new Error(`Please provide a value for ${val}`);
};
