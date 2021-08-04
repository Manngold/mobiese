import _ from './fx';
const Util = {};

Util.queryGenerator = (object) =>
  _.go(
    Object.entries(object),
    _.map(([k, v]) => {
      if (v !== undefined) return `${k}=${v}`;
    }),
    _.reduce((a, b) => `${a}&${b}`)
  );

export default Util;
