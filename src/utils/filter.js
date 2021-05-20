import {FilterType} from '../const';
import {isWatch, isWatched, isFavorite} from './film';

export const filter = {
  [FilterType.ALL_MOVIES]: (films) => films,
  [FilterType.STATS]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => isWatch(film)),
  [FilterType.FAVORITES]: (films) => films.filter((film) => isFavorite(film)),
  [FilterType.HISTORY]: (films) => films.filter((film) => isWatched(film)),
};
