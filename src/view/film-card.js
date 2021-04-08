import dayjs from 'dayjs';

function getTimeFromMins(mins) {
  let hours = Math.trunc(mins/60);
  let minutes = mins % 60;
  return hours + 'h ' + minutes + 'm';
};

export const createFilmCardTemplate = (film) => {
  console.log(film)
  const { film_info, user_details } = film
  const date = dayjs(film_info.release.date).format('YYYY')
  const filmTime = getTimeFromMins(film_info.runtime)
  const isWatch = user_details.already_watched
    ? 'film-card__controls-item--active'
    : ''
  console.log(isWatch)
  const isInWatclist = user_details.watchlist
    ? 'film-card__controls-item--active'
    : ''
  const isFavorite = user_details.favorite
    ? 'film-card__controls-item--active'
    : ''
  return `<article class="film-card">
          <h3 class="film-card__title">${film_info.titles.title}</h3>
          <p class="film-card__rating">${film_info.total_rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${date}</span>
            <span class="film-card__duration">${filmTime}</span>
            <span class="film-card__genre">${film_info.genre[0]}</span>
          </p>
          <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">${film_info.description}</p>
          <a class="film-card__comments">${film_info.comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatclist}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatch}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};
