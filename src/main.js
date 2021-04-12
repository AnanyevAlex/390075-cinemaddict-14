import {createHeaderTemplate} from './view/header';
import {createNavTemplate} from './view/nav';
import {createSortTemplate} from './view/sort';
import {createFilmBlockTemplate} from './view/film-block';
import {createFilmListContainer} from './view/film-list-container';
import {createFilmCardTemplate} from './view/film-card';
import {createMoreBtn} from './view/more-btn';
// import {createFilmExtraBlockTemplate} from './view/film-extra-block';
import {createTopRatedTitleTemplate} from './view/top-rated-title';
import {createMostCommentedTitle} from './view/most-commented-title';
import {createFooterStatistics} from './view/footer-statistics';
// import {createPopupFilmInfo} from './view/popup-film-info';
import {generateMovie} from './mock/movie';
import {generateFilter} from './mock/filter';

const FILM_COUNT = 19;
// const CARD_FILM_EXTRA_COUNT = 2;
// const FILM_EXTRA_BLOCK_COUNT = 2;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill().map(generateMovie);
const  filters = generateFilter(films);

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');


render (headerElement, createHeaderTemplate());
render (mainElement, createNavTemplate(filters));
render (mainElement, createSortTemplate());
render (mainElement, createFilmBlockTemplate());

const filmBlock = mainElement.querySelector('.films');
const filmList = mainElement.querySelector('.films-list');

render (filmList, createFilmListContainer());

const filmListContainer = mainElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render (filmListContainer, createFilmCardTemplate(films[i]));
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmsCount = FILM_COUNT_PER_STEP;

  render (filmList, createMoreBtn());

  const showMoreBtn = filmList.querySelector('.films-list__show-more');

  showMoreBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render (filmListContainer, createFilmCardTemplate(film)));

    renderedFilmsCount += FILM_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreBtn.remove();
    }
  });
}

const [topRateFilmsBlock, mostCommentedFilmsBlock] = filmBlock.querySelectorAll('.films-list.films-list--extra');

render (topRateFilmsBlock, createTopRatedTitleTemplate());
render (mostCommentedFilmsBlock, createMostCommentedTitle());
render (topRateFilmsBlock, createFilmListContainer());
render (mostCommentedFilmsBlock, createFilmListContainer());

// for (let i = 0; i < FILM_EXTRA_BLOCK_COUNT; i++) {
//   render (filmBlock, createFilmExtraBlockTemplate());
// }

// const topRateFilmsContainer = topRateFilmsBlock.querySelector('.films-list__container');
// const mostCommentedFilmsContainer = mostCommentedFilmsBlock.querySelector('.films-list__container');
// for (let i = 0; i < CARD_FILM_EXTRA_COUNT; i++) {
//   render (topRateFilmsContainer, createFilmCardTemplate());
//   render (mostCommentedFilmsContainer, createFilmCardTemplate());
// }

const footerBlock = document.querySelector('.footer');
const footerStatisticsBlock = footerBlock.querySelector('.footer__statistics');

render (footerStatisticsBlock, createFooterStatistics(FILM_COUNT));
// render (footerBlock, createPopupFilmInfo(films[0]), 'afterend');
