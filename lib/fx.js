const _ = {};

_.curry =
	(f) =>
	(a, ..._) =>
		_.length ? f(a, ..._) : (..._) => f(a, ..._);

_.map = _.curry((f, iter) => {
	const res = [];
	for (const a of iter) {
		a instanceof Promise ? res.push(a.then(f(a))) : res.push(f(a));
	}
	return res;
});

_.filter = _.curry((f, iter) => {
	const res = [];
	for (const a of iter) {
		if (f(a)) res.push(a);
	}
	return res;
});

_.take = _.curry((l, iter) => {
	const res = [];

	if (l === res.length) return res;

	for (const a of iter) {
		res.push(a);

		if (l === res.length) break;
	}

	return res;
});

_.takeAll = (iter) => _.go(iter, _.take(Infinity));

_.reduce = _.curry((f, acc, iter) => {
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
