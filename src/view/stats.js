import Smart from '../view/smart.js';
import { getStatus } from '../utils/stats.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import {isWatched} from '../utils/film';
import {PeriodOfStatistics} from '../const';

dayjs.extend(isBetween);

const getWatchedFilmByPeriod = (films, period) => {
  const watchedFilm = films.filter((film) => isWatched(film));
  if (period === PeriodOfStatistics.ALL) {
    return watchedFilm;
  }
  return watchedFilm
    .slice()
    .filter((film) => dayjs(film.userDetails.watchingDate).isBetween(dayjs(), dayjs().subtract(1, period)));
};

const getWatchedStatistic = (watchedFilms) => {
  let watchingTime = 0;
  const genresStatistic = {};
  if (watchedFilms.length === 0) {
    return {
      watchingTime: 0,
      topGenre: '',
      genresStatistic,
      userStatus: getStatus(watchedFilms.length),
      watchedFilmCount: watchedFilms.length,
    };
  }

  for (let i = 0; i < watchedFilms.length; i++) {
    const film = watchedFilms[i];
    watchingTime += film.filmInfo.runtime,
    film.filmInfo.genre.forEach((elem) => genresStatistic[elem] = genresStatistic[elem] + 1 || 1);
  }

  const topGenres = Object.entries(genresStatistic)
    .sort((a, b) => b[1] - a[1]);
  return {
    watchingTime,
    topGenre: topGenres[0][0],
    genresStatistic,
    userStatus: getStatus(watchedFilms.length),
    watchedFilmCount: watchedFilms.length,
  };
};

const inputTemplate = (input, currentInput) => {
  return `<input type="radio"
   class="statistic__filters-input visually-hidden" name="statistic-filter"
   id="statistic-${input}" value="${input}"
    ${input === currentInput ? 'checked' : ''}>
  <label for="statistic-${input}" class="statistic__filters-label">
  ${input === PeriodOfStatistics.ALL ? 'All time' : `${input.charAt(0).toUpperCase() + input.slice(1)}`}</label>`;
};

const periodControlsTemplate = (currentInput) => {
  return Object.values(PeriodOfStatistics)
    .map((input) => inputTemplate(input, currentInput)).join('');
};

const statsTemplate = (data) => {
  const { films, statisticPeriod } = data;
  const watchedFilmByPeriod = getWatchedFilmByPeriod(films, statisticPeriod);
  const watchedStatistic = getWatchedStatistic(watchedFilmByPeriod);
  const { watchingTime,
    topGenre,
    watchedFilmCount,
    userStatus,
  } = watchedStatistic;

  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${userStatus}</span>
  </p>
  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>
    ${periodControlsTemplate(statisticPeriod)}
  </form>
  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${watchedFilmCount} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${watchingTime === 0 ? `${0}<span class="statistic__item-description">h</span>` : `${Math.trunc(watchingTime / 60)} <span class="statistic__item-description">h</span> ${watchingTime % 60} <span class="statistic__item-description">m</span></p>`}
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${topGenre}</p>
    </li>
  </ul>
  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>
</section>`;
};


export default class Stats extends Smart {
  constructor(films) {
    super();
    this._data = {
      films,
      statisticPeriod: PeriodOfStatistics.ALL,
    };
    this._periodChangeHandler = this._periodChangeHandler.bind(this);
    this._setInnersHandler();

    this._setChart();
  }

  getTemplate() {
    return statsTemplate(this._data);
  }

  _setInnersHandler() {
    this.getElement().querySelector('.statistic__filters').addEventListener('change', this._periodChangeHandler);
  }

  _periodChangeHandler(evt) {
    this.updateData({
      statisticPeriod: evt.target.value,
    });
  }

  restoreHandlers() {
    this._setInnersHandler();
    this._setChart();
  }

  _setChart() {
    const statisticCtx = this.getElement().querySelector('.statistic__chart');
    const BAR_HEIGHT = 50;
    statisticCtx.height = BAR_HEIGHT * 5;
  }
}
