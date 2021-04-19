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
import {getSortFilm, render, RenderPosition} from './utils';

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


render (headerComponent.getElement(), new HeaderView().getElement(), RenderPosition.BEFOREEND);
render (mainElement, new NavView(filters).getElement(), RenderPosition.BEFOREEND);
render (mainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
render (mainElement, new FilmBlockView().getElement(), RenderPosition.BEFOREEND);


const filmBlock = mainElement.querySelector('.films');
const filmList = mainElement.querySelector('.films-list');

if (!films.length) {
  render (filmList, new NoFilmsView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(filmBlock, new FilmListContainerView().getElement(), RenderPosition.BEFOREEND);
  render(filmList, new FilmListContainerView().getElement(), RenderPosition.BEFOREEND);

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

    filmCardComponent.getElement().querySelectorAll('.film-card__poster, .film-card__title, .film-card__comments').forEach((item) => {
      item.addEventListener('click', () => {
        openPopup();
      });
    });

    filmPopupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
      closePopup();
    });

    render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
  };

  const filmListContainer = mainElement.querySelector('.films-list__container');
  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    renderFilmCard(filmListContainer, films[i]);
  }

  if (films.length > FILM_COUNT_PER_STEP) {
    let renderedFilmsCount = FILM_COUNT_PER_STEP;

    render(filmList, new MoreBtnView().getElement(), RenderPosition.BEFOREEND);

    const showMoreBtn = filmList.querySelector('.films-list__show-more');

    showMoreBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      films
        .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilmCard(filmListContainer, film));

      renderedFilmsCount += FILM_COUNT_PER_STEP;

      if (renderedFilmsCount >= films.length) {
        showMoreBtn.remove();
      }
    });
  }

  for (let i = 0; i < FILM_EXTRA_BLOCK_COUNT; i++) {
    render(filmBlock, new FilmExtraBlockView().getElement(), RenderPosition.BEFOREEND);
  }
  const [topRateFilmsBlock, mostCommentedFilmsBlock] = filmBlock.querySelectorAll('.films-list.films-list--extra');

  render(topRateFilmsBlock, new TopRatedTitleView().getElement(), RenderPosition.BEFOREEND);
  render(mostCommentedFilmsBlock, new MostCommentedTitleView().getElement(), RenderPosition.BEFOREEND);
  render(topRateFilmsBlock, new FilmListContainerView().getElement(), RenderPosition.BEFOREEND);
  render(mostCommentedFilmsBlock, new FilmListContainerView().getElement(), RenderPosition.BEFOREEND);

  const topRateFilmsContainer = topRateFilmsBlock.querySelector('.films-list__container');
  const mostCommentedFilmsContainer = mostCommentedFilmsBlock.querySelector('.films-list__container');
  for (let i = 0; i < CARD_FILM_EXTRA_COUNT; i++) {
    renderFilmCard(topRateFilmsContainer, mostRateFilms[i]);
    renderFilmCard(mostCommentedFilmsContainer, mostCommentFilms[i]);
  }
}
const footerBlock = document.querySelector('.footer');
const footerStatisticsBlock = footerBlock.querySelector('.footer__statistics');

render (footerStatisticsBlock, new FooterStatisticsView(FILM_COUNT).getElement(), RenderPosition.BEFOREEND);
