import AbstractView from './abstract';
import {isWatch, isWatched, isFavorite, getTimeFromMins, dateRelese} from '../utils/film';

const createFilmCardTemplate = (film) => {
  const { film_info, userDetails } = film;

  return `<article class="film-card">
          <h3 class="film-card__title">${film_info.titles.title}</h3>
          <p class="film-card__rating">${film_info.totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${dateRelese(film_info.release.date, 'year')}</span>
            <span class="film-card__duration">${getTimeFromMins(film_info.runtime)}</span>
            <span class="film-card__genre">${film_info.genre[0]}</span>
          </p>
          <img src="${film_info.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${film_info.description}</p>
          <a class="film-card__comments">${film_info.comments.length} comments</a>
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
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelectorAll('.film-card__poster, .film-card__title, .film-card__comments').forEach((item) => {
      item.addEventListener('click', this._editClickHandler);
    });
  }
}
