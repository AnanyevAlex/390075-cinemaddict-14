import dayjs from 'dayjs';

export const dateRelese = (date, type) => {
  return type === 'year' ? dayjs(date).format('YYYY') : dayjs(date).format('D-MMMM-YYYY');
};

export const getCommentDate = (date) => {
  return dayjs(date).format('YYYY/MM/D HH:MM' );
}

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex]
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

export const isWatch = (watch) => {
  return watch === true ? 'film-card__controls-item--active' : '';
}

export const isInWatchlist = (watchlist) => {
  return watchlist === true ? 'film-card__controls-item--active' : ''
};

export const isFavorite = (favorite) => {
  return favorite === true ? 'film-card__controls-item--active' : '';
};

export const getTimeFromMins = (mins) => {
  let hours = Math.trunc(mins/60);
  let minutes = mins % 60;
  return hours + 'h ' + minutes + 'm';
};

export const getStringOFArray = (item) => {
  return item.join(', ');
}

export const isChecked = (boolean) => {
  return boolean === true ? 'checked' : '';
}
