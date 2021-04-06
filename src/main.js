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

import './mock/movie.js';

const CARD_FILM_COUNT = 5;
const CARD_FILM_EXTRA_COUNT = 2;
const FILM_EXTRA_BLOCK_COUNT = 2;

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector('.header');
const MainElement = document.querySelector('.main');


render (headerElement, createHeaderTemplate());
render (MainElement, createNavTemplate());
render (MainElement, createSortTemplate());
render (MainElement, createFilmBlockTemplate());

const FilmBlock = MainElement.querySelector('.films');
const FilmList = MainElement.querySelector('.films-list');

render (FilmList, createFilmListContainer());

const FilmListContainer = MainElement.querySelector('.films-list__container');

for (let i = 0; i < CARD_FILM_COUNT; i++) {
  render (FilmListContainer, createFilmCardTemplate());
}
render (FilmList, createMoreBtn());

for (let i = 0; i < FILM_EXTRA_BLOCK_COUNT; i++) {
  render (FilmBlock, createFilmExtraBlockTemplate());
}

const [TopRateFilmsBlock, MostCommentedFilmsBlock] = FilmBlock.querySelectorAll('.films-list.films-list--extra');

render (TopRateFilmsBlock, createTopRatedTitleTemplate());
render (MostCommentedFilmsBlock, createMostCommentedTitle());
render (TopRateFilmsBlock, createFilmListContainer());
render (MostCommentedFilmsBlock, createFilmListContainer());

const topRateFilmsContainer = TopRateFilmsBlock.querySelector('.films-list__container');
const mostCommentedFilmsContainer = MostCommentedFilmsBlock.querySelector('.films-list__container');
for (let i = 0; i < CARD_FILM_EXTRA_COUNT; i++) {
  render (topRateFilmsContainer, createFilmCardTemplate());
  render (mostCommentedFilmsContainer, createFilmCardTemplate());
}

const footerBlock = document.querySelector('.footer');
const footerStatisticsBlock = footerBlock.querySelector('.footer__statistics');

render (footerStatisticsBlock, createFooterStatistics());
render (footerBlock, createPopupFilmInfo(), 'afterend');
