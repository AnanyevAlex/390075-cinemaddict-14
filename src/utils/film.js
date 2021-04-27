import dayjs from 'dayjs';
import {getRandomInteger} from './common';

export const dateRelese = (date, type) => {
  return type === 'year' ? dayjs(date).format('YYYY') : dayjs(date).format('D-MMMM-YYYY');
};

export const getCommentDate = (date) => {
  return dayjs(date).format('YYYY/MM/D HH:MM' );
};

export const getRandomItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

export const getRandomItems = (array, maxCount) => {
  const arrayCopy = array.slice().sort(() => Math.random() - 0.5);
  return arrayCopy.slice(0, maxCount);
};

export const generateDate = () => {
  const minDayGap = 180;
  const maxDayGap = 680;

  const daysGap = getRandomInteger(-minDayGap, -maxDayGap);
  return dayjs().add(daysGap, 'day').toDate();
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
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return hours + 'h ' + minutes + 'm';
};

export const getStringOFArray = (item) => {
  return item.join(', ');
};

export const isChecked = (boolean) => {
  return boolean === true ? 'checked' : '';
};

export const getSortFilm = (films, sortName) => {
  const topFilms = films.sort((a, b) => {
    if (sortName === 'rating') {
      return b.film_info.totalRating - a.film_info.totalRating;
    } else {
      return b.film_info.comments.length - a.film_info.comments.length;
    }
  });
  return topFilms;
};
