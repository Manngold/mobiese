import Util from './util';

const movieListQuery = {
  api_key: process.env.API_KEY,
  page: 1,
  region: 'kr',
};

window.addEventListener('load', () => {
  const query = Util.queryGenerator(movieListQuery);
  console.log(query);
});
