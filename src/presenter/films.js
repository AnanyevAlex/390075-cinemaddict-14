import HeaderView from '../view/header.js';
import NavView from '../view/nav';
import SortView from '../view/sort';
import FilmBlockView from '../view/film-block';
import FilmListContainerView from '../view/film-list-container';
import MoreBtnView from '../view/more-btn';
import FilmExtraBlockView from '../view/film-extra-block';
import TopRatedTitleView from '../view/top-rated-title';
import MostCommentedTitleView from '../view/most-commented-title';
import NoFilmsView from '../view/no-films';
import {render, RenderPosition, remove} from '../utils/render';
import {getSortFilm} from '../utils/film';
import FilmsCardPresenter from './films-card.js';
import {updateItem} from '../utils/common';

const FILM_COUNT_PER_STEP = 5;
const FILM_EXTRA_BLOCK_COUNT = 2;
const CARD_FILM_EXTRA_COUNT = 2;

export default class MovieList {
  constructor(mainContainer, headerContainer) {
    this._movieListHeader = headerContainer;
    this._movieListContainer = mainContainer;
    this._renderFilmCount = FILM_COUNT_PER_STEP;

    this._headerComponent = new HeaderView();
    this._sortComponent = new SortView();
    this._filmBlockComponent = new FilmBlockView();
    this._filmListComponent = new FilmListContainerView();
    this._noFilmsComponent = new NoFilmsView();
    this._filmBlock = null;
    this._filmList = null;
    this._filmListContainer = null;
    this._loadMoreBtnComponent = new MoreBtnView();
    this._mainFilmCardPresenters = {};
    this._topratingFilmCardPresenter = {};
    this._topCommentedFilmCardPresenter = {};

    this._handleChangeData = this._handleChangeData.bind(this);
    this._handleChangePopup = this._handleChangePopup.bind(this);
    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
  }
  init(films, filters) {

    this._films = films;
    this._filters = filters;
    this._renderHeader();
    this._renderNav();
    this._renderFilmBlock();
  }

  _handleChangeData(updateFilmCard, popupStatus) {
    this._films = updateItem(this._films, updateFilmCard);
    if (updateFilmCard.id in this._mainFilmCardPresenters) {
      this._mainFilmCardPresenters[updateFilmCard.id].init(updateFilmCard, popupStatus);
    }

    if (updateFilmCard.id in this._topratingFilmCardPresenter) {
      this._topratingFilmCardPresenter[updateFilmCard.id].init(updateFilmCard, popupStatus);
    }

    if (updateFilmCard.id in this._topCommentedFilmCardPresenter) {
      this._topCommentedFilmCardPresenter[updateFilmCard.id].init(updateFilmCard, popupStatus);
    }
  }

  _renderHeader() {
    render(this._movieListHeader, this._headerComponent, RenderPosition.BEFOREEND);
  }

  _renderNav() {
    this._navComponent = new NavView(this._filters);
    render(this._movieListContainer, this._navComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._movieListContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderNoFilms() {
    render (this._filmList, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(container, film) {
    this._filmCardPresenter = new FilmsCardPresenter(container, this._handleChangeData, this._handleChangePopup);
    this._filmCardPresenter.init(film);
  }

  _renderFilms(container, films, from, to, typePresenter) {
    films.slice(from, to).forEach((film) =>{
      this._renderFilm(container, film);
      if (typePresenter === 'rate') {
        this._topratingFilmCardPresenter[film.id] = this._filmCardPresenter;
      } else if (typePresenter === 'comment') {
        this._topCommentedFilmCardPresenter[film.id] = this._filmCardPresenter;
      } else {
        this._mainFilmCardPresenters[film.id] = this._filmCardPresenter;
      }
    });
  }

  _handleChangePopup () {
    [
      ... Object.values(this._mainFilmCardPresenters),
      ... Object.values(this._topCommentedFilmCardPresenter),
      ... Object.values(this._topratingFilmCardPresenter),
    ]
      .forEach((filmCard) => {
        filmCard.resetFilmView();});
  }

  _clearFilmCard () {
    Object.values(this._mainFilmCardPresenters)
      .forEach((filmCard) => {
        filmCard.destroy();});
    this._mainFilmCardPresenters = {};
    this._renderFilmCount = FILM_COUNT_PER_STEP;
    remove(this._loadMoreBtnComponent);
  }

  _handleLoadMoreBtnClick() {
    this._films
      .slice(this._renderFilmCount, this._renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this._renderFilm(this._filmListContainer, film));
    this._renderFilmCount += FILM_COUNT_PER_STEP;
    if (this._renderFilmCount >= this._films.length) {
      remove(this._loadMoreBtnComponent);
    }
  }

  _renderLoadMoreBtn() {
    render(this._filmList, this._loadMoreBtnComponent, RenderPosition.BEFOREEND);

    this._loadMoreBtnComponent.setClickHandler(this._handleLoadMoreBtnClick);
  }

  _renderExtraFilmBlock() {
    for (let i = 0; i < FILM_EXTRA_BLOCK_COUNT; i++) {
      render(this._filmBlock, new FilmExtraBlockView(), RenderPosition.BEFOREEND);
    }
    const [topRateFilmsBlock, mostCommentedFilmsBlock] = this._filmBlock.querySelectorAll('.films-list.films-list--extra');

    render(topRateFilmsBlock, new TopRatedTitleView(), RenderPosition.BEFOREEND);
    render(mostCommentedFilmsBlock, new MostCommentedTitleView(), RenderPosition.BEFOREEND);
    render(topRateFilmsBlock, new FilmListContainerView(), RenderPosition.BEFOREEND);
    render(mostCommentedFilmsBlock, new FilmListContainerView(), RenderPosition.BEFOREEND);

    this._renderExtraFilms(topRateFilmsBlock, mostCommentedFilmsBlock);
  }

  _renderExtraFilms(topRateFilmsBlock, mostCommentedFilmsBlock) {
    const mostRateFilms = getSortFilm(this._films, 'rating');
    const mostCommentFilms = getSortFilm(this._films, 'comment');
    const topRateFilmsContainer = topRateFilmsBlock.querySelector('.films-list__container');
    const mostCommentedFilmsContainer = mostCommentedFilmsBlock.querySelector('.films-list__container');

    this._renderFilms(topRateFilmsContainer, mostRateFilms, 0, CARD_FILM_EXTRA_COUNT, 'rate');
    this._renderFilms(mostCommentedFilmsContainer, mostCommentFilms, 0, CARD_FILM_EXTRA_COUNT, 'comment');
  }

  _renderFilmList() {
    this._filmListContainer = this._movieListContainer.querySelector('.films-list__container');

    this._renderFilms(this._filmListContainer, this._films, 0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreBtn();
    }
  }


  _renderFilmBlock() {
    if (!this._films.length) {
      this._renderNoFilms();
      return;
    }
    this._renderSort();
    render(this._movieListContainer, this._filmBlockComponent, RenderPosition.BEFOREEND);

    this._filmBlock = this._movieListContainer.querySelector('.films');
    this._filmList = this._movieListContainer.querySelector('.films-list');

    render(this._filmBlock, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmList, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderFilmList();

    this._renderExtraFilmBlock();
  }
}
