import {createHeaderTemplate} from './view/header';
import {createNavTemplate} from './view/nav';
import {createSortTemplate} from './view/sort';
import {createFilmBlockTemplate} from './view/film-block';
import {createFilmListContainer} from './view/film-list-container';
import {createFilmCardTemplate} from './view/film-card';
import {createMoreBtn} from './view/more-btn';
import {createFilmExtraBlockTemplate} from './view/film-extra-block';
import {createTopRatedTitleTemplate} from './view/top-rated-title';
import {createMostCommentedTitle} from './view/most-commented-title';
import {createFooterStatistics} from './view/footer-statistics';
import {createPopupFilmInfo} from './view/popup-film-info';
import {generateMovie} from './mock/movie';
import {generateFilter} from './mock/filter';

const CARD_FILM_COUNT = 5;
const CARD_FILM_EXTRA_COUNT = 2;
const FILM_EXTRA_BLOCK_COUNT = 2;

const films = new Array(CARD_FILM_COUNT).fill().map(generateMovie);
const  filters = generateFilter(films);

console.log(films)
console.log(filters)

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');


render (headerElement, createHeaderTemplate());
render (mainElement, createNavTemplate());
render (mainElement, createSortTemplate());
render (mainElement, createFilmBlockTemplate());

const filmBlock = mainElement.querySelector('.films');
const filmList = mainElement.querySelector('.films-list');

render (filmList, createFilmListContainer());

const filmListContainer = mainElement.querySelector('.films-list__container');

for (let i = 0; i < CARD_FILM_COUNT; i++) {
  render (filmListContainer, createFilmCardTemplate(films[i]));
}
render (filmList, createMoreBtn());

for (let i = 0; i < FILM_EXTRA_BLOCK_COUNT; i++) {
  render (filmBlock, createFilmExtraBlockTemplate());
}

const [topRateFilmsBlock, mostCommentedFilmsBlock] = filmBlock.querySelectorAll('.films-list.films-list--extra');

render (topRateFilmsBlock, createTopRatedTitleTemplate());
render (mostCommentedFilmsBlock, createMostCommentedTitle());
render (topRateFilmsBlock, createFilmListContainer());
render (mostCommentedFilmsBlock, createFilmListContainer());

// const topRateFilmsContainer = topRateFilmsBlock.querySelector('.films-list__container');
// const mostCommentedFilmsContainer = mostCommentedFilmsBlock.querySelector('.films-list__container');
// for (let i = 0; i < CARD_FILM_EXTRA_COUNT; i++) {
//   render (topRateFilmsContainer, createFilmCardTemplate());
//   render (mostCommentedFilmsContainer, createFilmCardTemplate());
// }

const footerBlock = document.querySelector('.footer');
const footerStatisticsBlock = footerBlock.querySelector('.footer__statistics');

render (footerStatisticsBlock, createFooterStatistics());
render (footerBlock, createPopupFilmInfo(films[0]), 'afterend');
