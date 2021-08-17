import _ from '../../lib/fx';
import Util from '../util';
import helper from '../../lib/helper';
import $ from '../../lib/dom';

const MovieService = {};
const BASE_URL = process.env.BASE_URL;
const IMG_BASE_URL = process.env.IMG_BASE_URL;
const NO_IMAGE_PATH =
	'https://raw.githubusercontent.com/Manngold/mannflix/master/src/assets/noPoster.png';

const movieDetailQuery = {
	api_key: process.env.API_KEY,
	region: 'kr',
};
const genImagePath = _.map((movie) => {
	if (!movie.poster_path) movie.poster_path = NO_IMAGE_PATH;
	else {
		movie.poster_path = `${IMG_BASE_URL}${movie.poster_path}`;
	}
	return movie;
});

const imgPathGenerator = (movieList) => {
	return movieList instanceof Promise
		? movieList.then(genImagePath)
		: genImagePath;
};
const getCardWrapper = (m) => m.className === 'card__wrapper';
const getId = (m) => m.dataset.id;

MovieService.fetchMovieList = async (url) =>
	_.go(Util.fetchData(url), Util.takeRes, imgPathGenerator);

MovieService.addPopup = async ({ path }) => {
	const [id] = _.go(path, _.filter(getCardWrapper), _.map(getId), _.take(1));
	if (!id) return;
	const query = Util.queryGenerator(movieDetailQuery);
	const url = Util.urlGenerator(BASE_URL, `/movie/${id}?`, query);
	const movie = await Util.fetchData(url);
	const popupTmpl = MovieService.popUpTmpl(movie);
	_.go(
		popupTmpl,
		$.genEl,
		$.appendChild($.qs('body')),
		$.addStyle('left', `${window.scrollX}px`)
	);

	_.go($.qs('body'), $.addStyle('overflow', 'hidden'));
	_.go($.qs('.close-btn'), $.addEvent(MovieService.removePopup, 'click'));
};

MovieService.removePopup = () => {
	_.go($.qs('.popup-background'), $.removeChild);
	_.go($.qs('body'), $.addStyle('overflow', 'visible'));
};

MovieService.popUpTmpl = (movie) => `
	<div class="popup-background">
		<div class="popup-body">
			<img class="popup-img" src="${IMG_BASE_URL}${movie.poster_path}"/>
			<div class="info">
				<h1>${movie.title}</h1>
				<span>${movie.release_date}</span>
				<span>${movie.runtime} Min</span>
				<span>🍿 ${movie.vote_average}</span>
				<p>${movie.overview}</p>
				<button class="close-btn">Close</button>
			</div>
		<div>
	</div>
`;

MovieService.tmpl = (movies) => `
	<div class="movie-list">
		${_.go(
			movies,
			_.map(
				(m) => `
			<div class="card__wrapper" data-id="${m.id}">
				<div class="img__wrapper">
					<img class="movie__img" src="${m.poster_path}"/>
					<div class="movie__info">
						<span class="movie__title">${m.title}</span>
						<span class="movie__release">${m.release_date}</span>
						<span class="movie__score">🍿 ${m.vote_average}</span>
					</div>
				</div>
			</div>
		`
			),
			_.reduce(helper.addString)
		)}
	</div>
`;

export default MovieService;
