import HeaderView from '../view/header.js';
import NavView from '../view/nav';
import SortView from '../view/sort';
import FilmBlockView from '../view/film-block';
import FilmListContainerView from '../view/film-list-container';
import FilmCardView from '../view/film-card';
import MoreBtnView from '../view/more-btn';
import FilmExtraBlockView from '../view/film-extra-block';
import TopRatedTitleView from '../view/top-rated-title';
import MostCommentedTitleView from '../view/most-commented-title';
import PopupFilmInfoView from '../view/popup-film-info';
import NoFilmsView from '../view/no-films';
import {render, RenderPosition, remove, replace} from '../utils/render';
import {getSortFilm} from '../utils/film';

const FILM_COUNT_PER_STEP = 5;
const FILM_EXTRA_BLOCK_COUNT = 2;
const CARD_FILM_EXTRA_COUNT = 2;

export default class MovieList {
  constructor(mainContainer, headerContainer) {
    this._movieListHeader = headerContainer
    this._bodyElement = document.querySelector('body');
    this._movieListContainer = mainContainer
    this._renderFilmCount = FILM_COUNT_PER_STEP;

    this._headerComponent = new HeaderView();
    this._sortComponent = new SortView();
    this._filmBlockComponent = new FilmBlockView();
    this._filmListComponent = new FilmListContainerView();
    this._noFilmsComponent = new NoFilmsView();
    this._filmBlock = null;
    this._filmList = null;
    this._filmListContainer = null;
    this._footerBlock = document.querySelector('.footer');
    this._loadMoreBtnComponent = new MoreBtnView();
    this._filmCardComponent = null;
    this._filmPopupComponent = null;

    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
    this._openPopup = this._openPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

  }
  init(films, filters) {

    this._films = films
    this._filters = filters
    this._renderHeader()
    this._renderNav()
    this._renderFilmBlock()


  }

  _renderHeader() {
    render(this._movieListHeader, this._headerComponent, RenderPosition.BEFOREEND)
  }

  _renderNav() {
    this._navComponent = new NavView(this._filters);
    render(this._movieListContainer, this._navComponent, RenderPosition.BEFOREEND)
  }

  _renderSort() {
    render(this._movieListContainer, this._sortComponent, RenderPosition.BEFOREEND)
  }

  _renderNoFilms() {
    render (this._filmList, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }



  _openPopup() {
    this._footerBlock.appendChild(this._filmPopupComponent.getElement());
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._bodyElement.classList.add('hide-overflow');
  }

  _closePopup() {
    this._footerBlock.removeChild(this._filmPopupComponent.getElement());
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._bodyElement.classList.remove('hide-overflow');
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closePopup(this._filmPopupComponent);
    }
  }

  _renderFilm(container, film) {
    const prevFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(film);


    console.log(prevFilmCardComponent)
    this._filmCardComponent.setEditClickHandler(() => {
      this._filmPopupComponent = new PopupFilmInfoView(film);
      this._filmPopupComponent.setCloseHandler(() => {
        this._closePopup();
      });
      this._openPopup();
    });

    if (prevFilmCardComponent === null) {
      render(container, this._filmCardComponent, RenderPosition.BEFOREEND);
      return
    }
  }

  _renderFilms(container, films, from, to) {
    films.slice(from, to).forEach((film) => this._renderFilm(container, film))
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

    this._loadMoreBtnComponent.setClickHandler(this._handleLoadMoreBtnClick)
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

    this._renderExtraFilms(topRateFilmsBlock, mostCommentedFilmsBlock)
  }

  _renderExtraFilms(topRateFilmsBlock, mostCommentedFilmsBlock) {
    const mostRateFilms = getSortFilm(this._films, 'rating');
    const mostCommentFilms = getSortFilm(this._films, 'comment');
    const topRateFilmsContainer = topRateFilmsBlock.querySelector('.films-list__container');
    const mostCommentedFilmsContainer = mostCommentedFilmsBlock.querySelector('.films-list__container');

    this._renderFilms(topRateFilmsContainer, mostRateFilms, 0, CARD_FILM_EXTRA_COUNT)
    this._renderFilms(mostCommentedFilmsContainer, mostCommentFilms, 0, CARD_FILM_EXTRA_COUNT)
  }

  _renderFilmList() {
    this._filmListContainer = this._movieListContainer.querySelector('.films-list__container');

    this._renderFilms(this._filmListContainer, this._films, 0, Math.min(this._films.length, FILM_COUNT_PER_STEP))

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreBtn()
    }
  }


  _renderFilmBlock() {
    if (!this._films.length) {
      this._renderNoFilms()
      return
    }
    this._renderSort()
    render(this._movieListContainer, this._filmBlockComponent, RenderPosition.BEFOREEND)

    this._filmBlock = this._movieListContainer.querySelector('.films');
    this._filmList = this._movieListContainer.querySelector('.films-list');

    render(this._filmBlock, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmList, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderFilmList();

    this._renderExtraFilmBlock();
  }
}
