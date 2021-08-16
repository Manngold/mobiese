import _ from '../../lib/fx';
import Util from '../util';
import helper from '../../lib/helper';

const MovieService = {};
const IMG_BASE_URL = process.env.IMG_BASE_URL;
const NO_IMAGE_PATH =
	'https://raw.githubusercontent.com/Manngold/mannflix/master/src/assets/noPoster.png';

const imgPathGenerator = _.map((movie) => {
	if (!movie.poster_path) movie.poster_path = NO_IMAGE_PATH;
	else {
		movie.poster_path = `${IMG_BASE_URL}${movie.poster_path}`;
	}
	return movie;
});

MovieService.fetchMovieList = (url) =>
	_.go(Util.fetchData(url), Util.takeRes, resolve);

MovieService.tmpl = (movies) =>
	_.go(
		movies,
		imgPathGenerator,
		_.map(
			(m) => `
		<div class="card__wrapper">
			<div class="img__wrapper">
				<img class="movie__img" src="${m.poster_path}"/>
				<div class="movie__info">
					<span class="movie__title">${m.title}</span>
					<span>${m.release_date}</span>
					<span>${m.vote_average}</span>
				</div>
			</div>
		</div>
	`
		),
		_.reduce(helper.addString)
	);

export default MovieService;
