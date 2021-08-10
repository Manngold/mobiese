import _ from '../../lib/fx';
import Util from '../util';

const MovieService = {};
const IMG_BASE_URL = process.env.IMG_BASE_URL;

const imgPathGenerator = _.map((movie) => {
	movie.backdrop_path = `${IMG_BASE_URL}${movie.backdrop_path}`;
	return movie;
});

MovieService.fetchMovieList = (url) => _.go(Util.fetchData(url), Util.takeRes);

MovieService.tmpl = (movies) => _.go(movies, imgPathGenerator, _.map());

export default MovieService;
