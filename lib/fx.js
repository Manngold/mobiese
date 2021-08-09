const _ = {};

const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

_.map = curry((f, iter) => {
  const res = [];
  for (const a of iter) {
    a instanceof Promise ? res.push(then(f(a))) : res.push(f(a));
  }
  return res;
});

_.reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  
  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
});

_.go = (...args) => _.reduce((a, f) => f(a), args);

module.exports = _;
