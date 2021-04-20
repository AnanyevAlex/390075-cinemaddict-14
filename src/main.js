import HeaderView from './view/header.js';
import NavView from './view/nav';
import SortView from './view/sort';
import FilmBlockView from './view/film-block';
import FilmListContainerView from './view/film-list-container';
import FilmCardView from './view/film-card';
import MoreBtnView from './view/more-btn';
import FilmExtraBlockView from './view/film-extra-block';
import TopRatedTitleView from './view/top-rated-title';
import MostCommentedTitleView from './view/most-commented-title';
import FooterStatisticsView from './view/footer-statistics';
import PopupFilmInfoView from './view/popup-film-info';
import NoFilmsView from './view/no-films';
import {generateMovie} from './mock/movie';
import {generateFilter} from './mock/filter';
import {getSortFilm} from './utils/film';
import {render, RenderPosition, remove} from './utils/render';

const FILM_COUNT = 10;
const CARD_FILM_EXTRA_COUNT = 2;
const FILM_EXTRA_BLOCK_COUNT = 2;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill().map(generateMovie);
const filters = generateFilter(films);

const mostRateFilms = getSortFilm(films, 'rating');
const mostCommentFilms = getSortFilm(films, 'comment');

const headerComponent = new HeaderView();
const mainElement = document.querySelector('.main');
const bodyElement = document.querySelector('body');


render (headerComponent, new HeaderView(), RenderPosition.BEFOREEND);
render (mainElement, new NavView(filters), RenderPosition.BEFOREEND);
render (mainElement, new SortView(), RenderPosition.BEFOREEND);
render (mainElement, new FilmBlockView(), RenderPosition.BEFOREEND);


const filmBlock = mainElement.querySelector('.films');
const filmList = mainElement.querySelector('.films-list');

if (!films.length) {
  render (filmList, new NoFilmsView(), RenderPosition.BEFOREEND);
} else {
  render(filmBlock, new FilmListContainerView(), RenderPosition.BEFOREEND);
  render(filmList, new FilmListContainerView(), RenderPosition.BEFOREEND);

  const renderFilmCard = (filmListElement, film) => {
    const filmCardComponent = new FilmCardView(film);
    const filmPopupComponent = new PopupFilmInfoView(film);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
      }
    };

    const openPopup = () => {
      footerBlock.appendChild(filmPopupComponent.getElement());
      document.addEventListener('keydown', onEscKeyDown);
      bodyElement.classList.add('hide-overflow');
    };

    const closePopup = () => {
      footerBlock.removeChild(filmPopupComponent.getElement());
      document.removeEventListener('keydown', onEscKeyDown);
      bodyElement.classList.remove('hide-overflow');
    };

    filmCardComponent.setEditClickHandler(() => {
      openPopup();
    });

    filmPopupComponent.setEditClickHandler(() => {
      closePopup();
    });

    render(filmListElement, filmCardComponent, RenderPosition.BEFOREEND);
  };

  const filmListContainer = mainElement.querySelector('.films-list__container');
  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    renderFilmCard(filmListContainer, films[i]);
  }

  if (films.length > FILM_COUNT_PER_STEP) {
    let renderedFilmsCount = FILM_COUNT_PER_STEP;

    const loadMoreBtnComponent = new MoreBtnView();

    render(filmList, loadMoreBtnComponent, RenderPosition.BEFOREEND);

    loadMoreBtnComponent.setClickHandler(() => {
      films
        .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilmCard(filmListContainer, film));

      renderedFilmsCount += FILM_COUNT_PER_STEP;

      if (renderedFilmsCount >= films.length) {
        remove(loadMoreBtnComponent);
      }
    });
  }

  for (let i = 0; i < FILM_EXTRA_BLOCK_COUNT; i++) {
    render(filmBlock, new FilmExtraBlockView(), RenderPosition.BEFOREEND);
  }
  const [topRateFilmsBlock, mostCommentedFilmsBlock] = filmBlock.querySelectorAll('.films-list.films-list--extra');

  render(topRateFilmsBlock, new TopRatedTitleView(), RenderPosition.BEFOREEND);
  render(mostCommentedFilmsBlock, new MostCommentedTitleView(), RenderPosition.BEFOREEND);
  render(topRateFilmsBlock, new FilmListContainerView(), RenderPosition.BEFOREEND);
  render(mostCommentedFilmsBlock, new FilmListContainerView(), RenderPosition.BEFOREEND);

  const topRateFilmsContainer = topRateFilmsBlock.querySelector('.films-list__container');
  const mostCommentedFilmsContainer = mostCommentedFilmsBlock.querySelector('.films-list__container');
  for (let i = 0; i < CARD_FILM_EXTRA_COUNT; i++) {
    renderFilmCard(topRateFilmsContainer, mostRateFilms[i]);
    renderFilmCard(mostCommentedFilmsContainer, mostCommentFilms[i]);
  }
}
const footerBlock = document.querySelector('.footer');
const footerStatisticsBlock = footerBlock.querySelector('.footer__statistics');

render (footerStatisticsBlock, new FooterStatisticsView(FILM_COUNT), RenderPosition.BEFOREEND);
