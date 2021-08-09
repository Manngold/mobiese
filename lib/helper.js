const helper = {};

helper.addNumber = (a, b) => a + b;
helper.addString = (a, b) => `${a}${b}`;
helper.sumQuery = (a, b) => `${a}&${b}`;
helper.setKeyValue = ([k, v]) => {
	if (v !== undefined) return `${k}=${v}`;
};

export default helper;
