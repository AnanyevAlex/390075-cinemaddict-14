import {isWatch, isWatched, isFavorite} from '../utils/film';

const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => isWatched(film)).length,
  history: (films) => films.filter((film) => isWatch(film)).length,
  favorites: (films) => films.filter((film) => isFavorite(film)).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
