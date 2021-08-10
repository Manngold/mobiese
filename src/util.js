import _ from '../lib/fx';
import helper from '../lib/helper';

const Util = {};

Util.queryGenerator = (object) =>
	_.go(
		Object.entries(object),
		_.map(helper.setKeyValue),
		_.reduce(helper.sumQuery)
	);

Util.urlGenerator = (baseUrl, ...args) => {
	if (!baseUrl || !baseUrl.length) throw new Error('baseUrl is undefined');

	const segments = [baseUrl, ...args];

	return _.go(segments, _.reduce(helper.addString));
};

Util.fetchData = (url) => fetch(url).then((res) => res.json());
Util.takeRes = (res) =>
	res instanceof Promise ? res.then((a) => a.results) : res;

export default Util;
