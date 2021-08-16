import Util from './util';
import $ from '../lib/dom';
import _ from '../lib/fx';
import MovieService from './services/movie_service';
import './app.css';

const movieListQuery = {
	api_key: process.env.API_KEY,
	page: 1,
	region: 'kr',
};

const BASE_URL = process.env.BASE_URL;

window.addEventListener('load', async () => {
	const query = Util.queryGenerator(movieListQuery);
	const url = Util.urlGenerator(BASE_URL, '/movie/popular?', query);

	const movieList = await MovieService.fetchMovieList(url);
	const movieTmpl = MovieService.tmpl(movieList);

	_.go(
		'div',
		$.cre,
		$.addClass('movie-list'),
		$.appendChild($.qs('#app')),
		$.innerHTML(movieTmpl)
	);
});

window.addEventListener('scroll', async () => {
	const { scrollLeft, clientWidth, scrollWidth } = document.documentElement;
	if (scrollLeft + clientWidth > scrollWidth - 10) {
		movieListQuery.page += 1;
		const query = Util.queryGenerator(movieListQuery);
		const url = Util.urlGenerator(BASE_URL, '/movie/popular?', query);
		const movieList = await MovieService.fetchMovieList(url);

		if (!movieList.length) return;

		const movieTmpl = MovieService.tmpl(movieList);

		_.go($.qs('.movie-list'), $.addInnerHTML(movieTmpl));
	}
});
