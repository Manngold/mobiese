import Util from './util';
import MovieService from './services/movie_service';

const movieListQuery = {
	api_key: process.env.API_KEY,
	page: 1,
	region: 'kr',
};

const BASE_URL = process.env.BASE_URL;

window.addEventListener('load', () => {
	const query = Util.queryGenerator(movieListQuery);
	const url = Util.urlGenerator(BASE_URL, '/movie/now_playing?', query);
});
