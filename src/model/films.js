import Observer from '../utils/observer.js';
import dayjs from 'dayjs';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(UpdateType, films) {
    this._films = films.slice();
    this._notify(UpdateType);
  }

  getFilms() {
    return this._films;
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        filmInfo: {
          poster: film.film_info.poster,
          titles:  {
            title: film.film_info.title,
            altTitle: film.film_info.alternative_title,
          },
          totalRating: film.film_info.total_rating,
          ageRating:  film.film_info.age_rating,
          director: film.film_info.director,
          writers: film.film_info.writers,
          actors: film.film_info.actors,
          release: {
            date: film.film_info.release.date,
            releaseCountry: film.film_info.release.release_country,
          },
          runtime: film.film_info.runtime,
          genre: film.film_info.genre,
          description: film.film_info.description,
        },
        userDetails: {
          watchlist: film.user_details.watchlist,
          alreadyWatched: film.user_details.already_watched,
          favorite: film.user_details.favorite,
          watchingDate: film.user_details.watching_date,
        },
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedFilm.user_details;
    delete adaptedFilm.film_info;
    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'film_info': {
          'poster': film.filmInfo.poster,
          'title': film.filmInfo.titles.title,
          'alternative_title': film.filmInfo.altTitle,
          'description': film.filmInfo.description,
          'director': film.filmInfo.director,
          'writers': film.filmInfo.writers,
          'actors': film.filmInfo.actors,
          'total_rating': film.filmInfo.totalRating,
          'release': {
            'date':  dayjs(film.filmInfo.release.date).toISOString(),
            'release_country': film.filmInfo.release.releaseCountry,
          },
          'runtime': film.filmInfo.runtime,
          'genre': film.filmInfo.genre,
          'age_rating': film.filmInfo.ageRating,
        },
        'user_details': {
          'watchlist': film.userDetails.watchlist,
          'favorite': film.userDetails.favorite,
          'already_watched':film.userDetails.alreadyWatched,
          'watching_date': dayjs(film.userDetails.watchingDate).toISOString(),
        },
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;

    return adaptedFilm;
  }

  updateData (typeUpdate, update, popupStatus) {
    const index = this._films.findIndex((film) => film.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t find update element');
    }
    this._films =[
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];
    this._notify(typeUpdate, update, popupStatus);
  }
}
