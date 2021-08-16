import _ from './fx';

const $ = {};

$.qs = (el) => document.querySelector(el);
$.qsa = (el) => document.querySelectorAll(el);
$.appendChild = _.curry((parent, child) => {
	return parent.appendChild(child);
});
$.cre = (el) => document.createElement(el);
$.addClass = _.curry((cls, el) => {
	el.classList.add(cls);
	return el;
});
$.innerHTML = _.curry((s, el) => (el.innerHTML = s));
$.addInnerHTML = _.curry((s, el) => (el.innerHTML += s));

export default $;
