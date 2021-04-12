import {isWatch, isInWatchlist, isFavorite, getTimeFromMins, dateRelese} from '../utils';

export const createFilmCardTemplate = (film) => {
  const { film_info, user_details } = film

  return `<article class="film-card">
          <h3 class="film-card__title">${film_info.titles.title}</h3>
          <p class="film-card__rating">${film_info.total_rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${dateRelese(film_info.release.date, 'year')}</span>
            <span class="film-card__duration">${getTimeFromMins(film_info.runtime)}</span>
            <span class="film-card__genre">${film_info.genre[0]}</span>
          </p>
          <img src="${film_info.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${film_info.description}</p>
          <a class="film-card__comments">${film_info.comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchlist(user_details.watchlist)}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatch(user_details.already_watched)}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite(user_details.favorite)}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};
