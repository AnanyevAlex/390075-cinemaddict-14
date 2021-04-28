import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {POSTER_LINK, EMOTION, COUNTRY, DIRECTORS, AGE_RATING} from '../const';
import {getRandomInteger} from '../utils/common';
import {getRandomItem, generateDate, getRandomItems} from '../utils/film';

const generateFilmTitle = () => {
  const title = [
    'Мстители',
    'Железный человек',
    'Человек паук',
    'Тор',
    'Капитан марвел',
  ];
  const altTitle = [
    'The Avengers',
    'Iron Man',
    'Spider-Man',
    'Thor',
    'Captain Marvel',
  ];

  const randomIndex = getRandomInteger(0, title.length - 1);
  const titles = {
    title: title[randomIndex],
    altTitle: altTitle[randomIndex],
  };

  return titles;
};

const generateTotalRating = () => {
  return getRandomInteger(0, 10);
};

const generateWrites = () => {
  const writes = [
    'Квентин Тарантино',
    'Джордж Лукас',
    'Джеймс Кэмерон',
    'Стивен Спилберг',
    'Коннет Лонерган',
  ];
  const writesCount = getRandomInteger(1, 3);
  const filmWrites = getRandomItems(writes, writesCount);

  return filmWrites;
};

const generateActors = () => {
  const actors = [
    'Джонни Депп',
    'Арнольд Шварценеггер',
    'Джим Керри',
    'Том Круз',
    'Брэд Питт',
  ];
  const actorsCount = getRandomInteger(1, 3);
  const filmActors = getRandomItems(actors, actorsCount);

  return filmActors;
};

const generateRuntime = () => {
  return getRandomInteger(60, 145);
};

const generateGenre = () => {
  const genre = [
    'Ужасы',
    'Комедия',
    'Боевик',
    'Драмма',
  ];

  const genreCount = getRandomInteger(1, 4);
  const filmGenre = getRandomItems(genre, genreCount);

  return filmGenre;
};

const generateDesc = () => {
  const randomText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const textArray = randomText.split('.');

  const sentenceCount = getRandomInteger(1, 5);
  const descArr = getRandomItems(textArray, sentenceCount);
  const desc = descArr.join(',');

  return desc;
};

const generateWatchDate = () => {
  const minDayGap = 0;
  const maxDayGap = 680;

  const daysGap = getRandomInteger(minDayGap, -maxDayGap);
  return dayjs().add(daysGap, 'day').toDate();
};

const generateCommentDate = () => {
  const minDayGap = 0;
  const maxDayGap = 680;

  const daysGap = getRandomInteger(minDayGap, -maxDayGap);
  return dayjs().add(daysGap, 'day').toDate();
};

export const generateComments = (id) => {
  return {
    id: id,
    author: 'Ilya O\'Reilly',
    comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    date: generateCommentDate(),
    emotion: getRandomItem(EMOTION),
  };
};

export const generateMovie = () => {
  return {
    id: nanoid(),
    filmInfo: {
      poster: getRandomItem(POSTER_LINK),
      titles: generateFilmTitle(),
      totalRating: generateTotalRating(),
      ageRating: getRandomItem(AGE_RATING),
      director: getRandomItem(DIRECTORS),
      writers: generateWrites(),
      actors: generateActors(),
      release: {
        date: generateDate(),
        releaseCountry: getRandomItem(COUNTRY),
      },
      comments: [ generateComments(1), generateComments(1)],
      runtime: generateRuntime(),
      genre: generateGenre(),
      description: generateDesc(),
    },
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      alreadyWatched: Boolean(getRandomInteger(0, 1)),
      favorite: Boolean(getRandomInteger(0, 1)),
      watchingDate: generateWatchDate(),
    },
  };
};
