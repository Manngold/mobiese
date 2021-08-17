import _ from './fx';

const $ = {};

$.qs = (el) => document.querySelector(el);
$.qsa = (el) => document.querySelectorAll(el);
$.getChildren = (parent) => parent.children;
$.appendChild = _.curry((parent, child) => {
	return parent.appendChild(child);
});
$.appendChildAll = _.curry((parent, childs) => {
	for (const child of childs) {
		parent.appendChild(child);
	}
	return parent;
});
$.genEl = (html) => {
	const div = document.createElement('div');
	div.innerHTML = html;
	return div.children[0];
};
$.cre = (el) => document.createElement(el);
$.addClass = _.curry((cls, el) => {
	el.classList.add(cls);
	return el;
});
$.innerHTML = _.curry((s, el) => (el.innerHTML = s));
$.addInnerHTML = _.curry((s, el) => {
	el.innerHTML += s;
	return el;
});
$.removeChild = (el) => el.parentNode.removeChild(el);
$.addEvent = _.curry((f, e) => (el) => el.addEventListener(e, f));
$.addStyle = (k, v) => (el) => {
	el.style[k] = v;
	return el;
};

export default $;
