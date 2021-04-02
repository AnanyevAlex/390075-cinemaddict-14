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

const CARD_FILM_COUNT = 5;
const CARD_FILM_EXTRA_COUNT = 2;
const FILM_EXTRA_BLOCK_COUNT = 2;

const insertPlace = 'beforeend';
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const HeaderElement = document.querySelector('.header');
const MainElement = document.querySelector('.main');


render (HeaderElement, createHeaderTemplate(), insertPlace);
render (MainElement, createNavTemplate(), insertPlace);
render (MainElement, createSortTemplate(), insertPlace);
render (MainElement, createFilmBlockTemplate(), insertPlace);

const FilmBlock = MainElement.querySelector('.films');
const FilmList = MainElement.querySelector('.films-list');

render (FilmList, createFilmListContainer(), insertPlace);

const FilmListContainer = MainElement.querySelector('.films-list__container');

for (let i = 0; i < CARD_FILM_COUNT; i++) {
  render (FilmListContainer, createFilmCardTemplate(), insertPlace);
}
render (FilmList, createMoreBtn(), insertPlace);

for (let i = 0; i < FILM_EXTRA_BLOCK_COUNT; i++) {
  render (FilmBlock, createFilmExtraBlockTemplate(), insertPlace);
}

const [TopRateFilmsBlock, MostCommentedFilmsBlock] = FilmBlock.querySelectorAll('.films-list.films-list--extra');

render (TopRateFilmsBlock, createTopRatedTitleTemplate(), insertPlace);
render (MostCommentedFilmsBlock, createMostCommentedTitle(), insertPlace);
render (TopRateFilmsBlock, createFilmListContainer(), insertPlace);
render (MostCommentedFilmsBlock, createFilmListContainer(), insertPlace);

const topRateFilmsContainer = TopRateFilmsBlock.querySelector('.films-list__container');
const mostCommentedFilmsContainer = MostCommentedFilmsBlock.querySelector('.films-list__container');
for (let i = 0; i < CARD_FILM_EXTRA_COUNT; i++) {
  render (topRateFilmsContainer, createFilmCardTemplate(), insertPlace);
  render (mostCommentedFilmsContainer, createFilmCardTemplate(), insertPlace);
}

const footerBlock = document.querySelector('.footer');
const footerStatisticsBlock = footerBlock.querySelector('.footer__statistics');

render (footerStatisticsBlock, createFooterStatistics(), insertPlace);
render (footerBlock, createPopupFilmInfo(), 'afterend');
