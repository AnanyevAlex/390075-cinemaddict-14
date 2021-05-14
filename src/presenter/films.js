import SortView from '../view/sort';
import FilmBlockView from '../view/film-block';
import FilmListContainerView from '../view/film-list-container';
import MoreBtnView from '../view/more-btn';
import FilmExtraBlockView from '../view/film-extra-block';
import TopRatedTitleView from '../view/top-rated-title';
import MostCommentedTitleView from '../view/most-commented-title';
import NoFilmsView from '../view/no-films';
import LoadingView from '../view/loading';
import {render, remove, replace} from '../utils/render';
import {getSortFilm} from '../utils/film';
import FilmsCardPresenter from './films-card.js';
import {FilterType, SortType, UpdateType, UserAction} from '../const';
import {sortDateUp} from '../utils/film';
import {filter} from '../utils/filter';
import StatsView from '../view/stats';

const FILM_COUNT_PER_STEP = 5;
const FILM_EXTRA_BLOCK_COUNT = 2;
const CARD_FILM_EXTRA_COUNT = 2;

export default class MovieList {
  constructor(mainContainer, filmsModel, filterModel, api) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._movieListContainer = mainContainer;
    this._statsComponent = null;
    this._renderFilmCount = FILM_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._sortComponent = null;
    this._loadMoreBtnComponent = null;
    this._filmBlockComponent = new FilmBlockView();
    this._filmListComponent = new FilmListContainerView();
    this._noFilmsComponent = new NoFilmsView();
    this._loadingComponent = new LoadingView();
    this._filmBlock = null;
    this._filmList = null;
    this._isLoading = true;
    this._filmListContainer = null;
    this._topRateFilmsContainer = null;
    this._mostCommentedFilmsContainer = null;
    this._mainFilmCardPresenters = {};
    this._topratingFilmCardPresenter = {};
    this._topCommentedFilmCardPresenter = {};
    this._api = api;

    this._handleChangePopup = this._handleChangePopup.bind(this);
    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilmBlock();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const filteredFilms = filter[filterType](this._filmsModel.getFilms());

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortDateUp);
      case SortType.RATE:
        return getSortFilm(filteredFilms, 'rating');
      case SortType.DEFAULT:
        return filteredFilms;
    }
  }

  _handleViewAction(userAction, updateType, update, popupStatus) {
    switch (userAction) {
      case UserAction.UPDATE:
        this._api.updateFilm(update).then((response) => {
          this._filmsModel.updateData(updateType, response);
        });
        break;
      case UserAction.ADD_COMMENT:
        this._filmsModel.updateData(updateType, update, popupStatus);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.updateData(updateType, update, popupStatus);
        break;
    }
  }

  _handleModelEvent(updateType, updateFilmCard) {
    if (updateFilmCard === FilterType.STATS) {
      updateType = FilterType.STATS;
    }
    switch (updateType) {
      case FilterType.STATS:
        this._clearFilms({ resetRenderedCard: true, resetSortType: true });
        this._renderStatsComponent();
        replace(this._statsComponent,this._filmListComponent);
        break;
      case UpdateType.PATH:
        if (updateFilmCard.id in this._mainFilmCardPresenters) {
          this._mainFilmCardPresenters[updateFilmCard.id].init(updateFilmCard);
        }

        if (updateFilmCard.id in this._topratingFilmCardPresenter) {
          this._topratingFilmCardPresenter[updateFilmCard.id].init(updateFilmCard);
        }

        if (updateFilmCard.id in this._topCommentedFilmCardPresenter) {
          this._topCommentedFilmCardPresenter[updateFilmCard.id].init(updateFilmCard);
          this._clearExtraFilmsPresenters();
          this._renderExtraFilms();
        }
        break;
      case UpdateType.MINOR:
        this._clearFilms();
        this._renderFilmBlock();
        break;
      case UpdateType.MAJOR:
        this._clearFilms({ resetFilmCardCount: true, resetSortType: true});
        if (this._statsComponent !== null) {
          replace(this._filmListComponent,this._statsComponent);
          remove(this._statsComponent);
          this._statsComponent = null;
          this._renderFilmBlock();
        } else {
          this._renderFilmBlock();

        }
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderFilmBlock();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearFilms({resetFilmCardCount: true});
    this._renderFilmBlock();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._movieListContainer, this._sortComponent);
  }

  _renderNoFilms() {
    render(this._filmList, this._noFilmsComponent);
  }

  _renderLoading() {
    render(this._filmList, this._noFilmsComponent);
  }

  _renderFilm(container, film, typePresenter) {
    this._filmCardPresenter = new FilmsCardPresenter(container, this._handleViewAction, this._handleChangePopup, this._api);
    this._filmCardPresenter.init(film);
    if (typePresenter === 'rate') {
      this._topratingFilmCardPresenter[film.id] = this._filmCardPresenter;
    } else if (typePresenter === 'comment') {
      this._topCommentedFilmCardPresenter[film.id] = this._filmCardPresenter;
    } else {
      this._mainFilmCardPresenters[film.id] = this._filmCardPresenter;
    }
  }

  _renderFilms(container, films, typePresenter) {
    films.forEach((film) => this._renderFilm(container, film, typePresenter));
  }

  _handleChangePopup() {
    [
      ...Object.values(this._mainFilmCardPresenters),
      ...Object.values(this._topCommentedFilmCardPresenter),
      ...Object.values(this._topratingFilmCardPresenter),
    ]
      .forEach((filmCard) => {
        filmCard.resetFilmView();
      });
  }

  _handleLoadMoreBtnClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderFilmCount, newRenderedFilmCount);
    this._renderFilms(this._filmListContainer, films);
    this._renderFilmCount = newRenderedFilmCount;

    if (this._renderFilmCount >= filmCount) {
      remove(this._loadMoreBtnComponent);
    }
  }

  _renderLoadMoreBtn() {
    if (this._loadMoreBtnComponent !==null) {
      this._loadMoreBtnComponent = null;
    }

    this._loadMoreBtnComponent = new MoreBtnView();

    if (this._renderFilmCount >= this._getFilms().length) {
      return;
    }
    this._loadMoreBtnComponent.setClickHandler(this._handleLoadMoreBtnClick);
    render(this._filmList, this._loadMoreBtnComponent);

  }

  _renderExtraFilmBlock() {
    for (let i = 0; i < FILM_EXTRA_BLOCK_COUNT; i++) {
      render(this._filmBlock, new FilmExtraBlockView());
    }
    const [topRateFilmsBlock, mostCommentedFilmsBlock] = this._filmBlock.querySelectorAll('.films-list.films-list--extra');

    render(topRateFilmsBlock, new TopRatedTitleView());
    render(mostCommentedFilmsBlock, new MostCommentedTitleView());
    render(topRateFilmsBlock, new FilmListContainerView());
    render(mostCommentedFilmsBlock, new FilmListContainerView());
    this._topRateFilmsContainer = topRateFilmsBlock.querySelector('.films-list__container');
    this._mostCommentedFilmsContainer = mostCommentedFilmsBlock.querySelector('.films-list__container');


    this._renderExtraFilms(topRateFilmsBlock, mostCommentedFilmsBlock);
  }

  _renderExtraFilms() {
    const mostRateFilms = getSortFilm(this._getFilms(), 'rating').slice(0, CARD_FILM_EXTRA_COUNT);
    const mostCommentFilms = getSortFilm(this._getFilms(), 'comment').slice(0, CARD_FILM_EXTRA_COUNT);

    this._renderFilms(this._topRateFilmsContainer, mostRateFilms, 'rate');
    this._renderFilms(this._mostCommentedFilmsContainer, mostCommentFilms, 'comment');
  }

  _renderFilmList() {
    this._filmListContainer = this._movieListContainer.querySelector('.films-list__container');

    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILM_COUNT_PER_STEP));

    this._renderFilms(this._filmListContainer, films);

    if (filmCount > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreBtn();
    }
  }

  _clearExtraFilmsPresenters() {
    [
      ...Object.values(this._topCommentedFilmCardPresenter),
      ...Object.values(this._topratingFilmCardPresenter),
    ]
      .forEach((presenter) => {
        presenter.destroy();
      });
  }

  _clearExtraFilmsBlock() {
    document.querySelectorAll('.films-list.films-list--extra').forEach((item) => item.remove());
  }

  _clearMainFilmsPresenters() {
    [
      ...Object.values(this._mainFilmCardPresenters),
    ]
      .forEach((presenter) => {
        presenter.destroy();
      });
  }

  _clearFilms({ resetFilmCardCount = false, resetSortType =  false} = {}) {
    const filmsCount = this._getFilms().length;
    this._clearExtraFilmsPresenters();
    this._clearMainFilmsPresenters();
    this._clearExtraFilmsBlock();
    this._mainFilmCardPresenters = {};
    this._topCommentedFilmCardPresenter = {};
    this._topratingFilmCardPresenter = {};
    remove(this._sortComponent);
    remove(this._noFilmsComponent);
    remove(this._loadingComponent);
    remove(this._loadMoreBtnComponent);

    if (resetFilmCardCount) {
      this._renderFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderFilmCount = Math.min(filmsCount, this._renderFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderFilmBlock() {
    render(this._movieListContainer, this._filmBlockComponent);
    this._filmBlock = this._movieListContainer.querySelector('.films');
    this._filmList = this._movieListContainer.querySelector('.films-list');
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    render(this._filmBlock, this._filmListComponent);
    render(this._filmList, this._filmListComponent);

    this._renderSort();
    if (!this._getFilms().length) {
      this._renderNoFilms();
      return;
    }

    this._renderFilmList();
    this._renderExtraFilmBlock();
  }

  _renderStatsComponent () {
    this._statsComponent = new StatsView(this._filmsModel.getFilms());
    render(this._filmListComponent, this._statsComponent);
  }
}
