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
      return b.filmInfo.totalRating - a.filmInfo.totalRating;
    } else {
      return b.filmInfo.comments.length - a.filmInfo.comments.length;
    }
  });
  return topFilms;
};

// const getWeightForNullDate = (dateA, dateB) => {
//   if (dateA === null && dateB === null) {
//     console.log('0')
//     return 0;
//   }
//
//   if (dateA === null) {
//     console.log('1')
//     return 1;
//   }
//
//   if (dateB === null) {
//     console.log('2')
//     return -1;
//   }
// };

export const sortDateUp = (filmA, filmB) => {
  // const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  // if (weight !== null) {
  //   console.log('test')
  //   console.log(weight)
  //   return weight;
  // }

  return dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};
