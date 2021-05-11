export const POSTER_LINK = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];
export const AGE_RATING = [
  '0+',
  '6+',
  '12+',
  '16+',
  '18+',
];
export const DIRECTORS = [
  'Стив Джобс',
  'Билл Гейтс',
  'Илон Маск',
];
export const COUNTRY = [
  'США',
  'Россия',
  'Франция',
  'Италия',
];
export const EMOTION = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];
export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATE: 'rate',
};

export const UserAction = {
  UPDATE: 'update',
  ADD_COMMENT: 'add comment',
  DELETE_COMMENT: 'delete',
};

export const UpdateType = {
  MINOR: 'minor',
  MAJOR: 'major',
  PATH: 'path',
  INIT: 'init',
};

export const PopupControlType = {
  FAVORITE: 'favorite',
  WATCHLIST: 'watchlist',
  WATCHED: 'watched',
};

export const PopupStatus = {
  OPEN: 'open',
  CLOSE: 'close',
};

export const FilterType = {
  ALL_MOVIES: 'All movies',
  WATCHLIST: 'Watchlist',
  FAVORITES: 'Favorites',
  HISTORY: 'History',
  STATS: 'Stats',
};

export const USER_STATUS = {
  'none': {
    FROM: 0,
    TO: 0,
  },
  'novice': {
    FROM: 1,
    TO: 10,
  },
  'fan': {
    FROM: 11,
    TO: 20,
  },
  'movie buff': {
    FROM: 21,
    TO: 100,
  },
};

export const PeriodOfStatistics = {
  ALL: 'all-time',
  TODAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};
