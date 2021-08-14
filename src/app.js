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
	const url = Util.urlGenerator(BASE_URL, '/movie/now_playing?', query);

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
