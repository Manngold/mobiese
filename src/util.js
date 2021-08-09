import _ from '../lib/fx';
const Util = {};

const sumQuery = (a, b) => `${a}&${b}`
const setKeyValue = ([k, v]) => {
  if (v !== undefined) return `${k}=${v}`;
}

Util.queryGenerator = (object) =>
  _.go(
    Object.entries(object),
    _.map(setKeyValue),
    _.reduce(sumQuery)
  );

export default Util;
