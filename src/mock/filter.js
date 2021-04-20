import {isWatch, isInWatchlist, isFavorite} from '../utils/film';

const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => isInWatchlist(film.user_details.watchlist)).length,
  history: (films) => films.filter((film) => isWatch(film.user_details.already_watched)).length,
  favorites: (films) => films.filter((film) => isFavorite(film.user_details.favorite)).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
