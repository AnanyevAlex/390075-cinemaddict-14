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

export const PopupState = {
  DELETE: 'delete',
  DISABLED: 'disable',
  DEFAULT: 'default',
  SUBMIT: 'submit',
  ABORTING: 'aborting',
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
