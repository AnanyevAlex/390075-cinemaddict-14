import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
dayjs.extend(relativeTime);

export const dateRelese = (date, type) => {
  return type === 'year' ? dayjs(date).format('YYYY') : dayjs(date).format('D-MMMM-YYYY');
};

export const getCommentDate = (date) => {
  return dayjs(date).fromNow();
};

export const isWatch = (film) => {
  return film.userDetails.watchlist;
};

export const isWatched = (film) => {
  return film.userDetails.alreadyWatched;
};

export const isFavorite = (film) => {
  return film.userDetails.favorite;
};

export const getTimeFromMins = (mins) => {
  return dayjs.duration(mins, 'minutes').format('HH[h] mm[m]');
};

export const getStringOFArray = (item) => {
  return item.join(', ');
};

export const isChecked = (boolean) => {
  return boolean === true ? 'checked' : '';
};

export const getSortFilm = (films, sortName) => {
  const topFilms = films.slice().sort((a, b) => {
    if (sortName === 'rating') {
      return b.filmInfo.totalRating - a.filmInfo.totalRating;
    } else {
      return b.comments.length - a.comments.length;
    }
  });
  return topFilms;
};

export const sortDateUp = (filmA, filmB) => {
  return dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};
