import {FilterType} from '../const';
import {isWatch, isWatched, isFavorite} from '../utils/film';


export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => isWatched(film)),
  [FilterType.FAVORITES]: (films) => films.filter((film) => isFavorite(film)),
  [FilterType.HISTORY]: (films) => films.filter((film) => isWatch(film)),
};

export const FilterTypeMatchToFilmsControl = {
  [FilterType.WATCHLIST]: 'isWatchList',
  [FilterType.FAVORITES]: 'isFavorite',
  [FilterType.HISTORY]: 'isWatched',
};
