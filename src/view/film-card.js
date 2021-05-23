import AbstractView from './abstract';
import {isWatch, isWatched, isFavorite, getTimeFromMins, dateRelese, limitText} from '../utils/film';

const createFilmCardTemplate = (film) => {
  const { filmInfo } = film;

  return `<article class="film-card">
          <h3 class="film-card__title">${filmInfo.titles.title}</h3>
          <p class="film-card__rating">${filmInfo.totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${dateRelese(filmInfo.release.date, 'year')}</span>
            <span class="film-card__duration">${getTimeFromMins(filmInfo.runtime)}</span>
            <span class="film-card__genre">${filmInfo.genre[0]}</span>
          </p>
          <img src="${filmInfo.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${limitText(filmInfo.description)}</p>
          <a class="film-card__comments">${film.comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatch(film) ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched(film) ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite(film) ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};


export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._handleAddToWatched = this._handleAddToWatched.bind(this);
    this._handleAddToWatchList = this._handleAddToWatchList.bind(this);
    this._handleAddToFavorites = this._handleAddToFavorites.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _handleAddToWatchList (evt) {
    evt.preventDefault();
    this._callback.onAddToWatchListClick();
  }

  _handleAddToFavorites (evt) {
    evt.preventDefault();
    this._callback.addToFavoritesClick();
  }

  _handleAddToWatched (evt) {
    evt.preventDefault();
    this._callback.addToWatchedClick();
  }

  setFilmCardWatchListClick (callback) {
    this._callback.onAddToWatchListClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._handleAddToWatchList);
  }

  setFilmCardFavoritsClick (callback) {
    this._callback.addToFavoritesClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._handleAddToFavorites);
  }

  setFilmCardWatchedClick (callback) {
    this._callback.addToWatchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._handleAddToWatched);
  }

  setFilmCardClick(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelectorAll('.film-card__poster, .film-card__title, .film-card__comments').forEach((item) => {
      item.addEventListener('click', this._editClickHandler);
    });
  }
}
