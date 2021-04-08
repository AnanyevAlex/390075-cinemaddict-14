import dayjs from 'dayjs';
const POSTER_LINK = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];
const AGE_RATING = [
  '0+',
  '6+',
  '12+',
  '16+',
  '18+',
];
const DIRECTORS = [
  'Стив Джобс',
  'Билл Гейтс',
  'Илон Маск',
];
const COUNTRY = [
  'США',
  'Россия',
  'Франция',
  'Италия',
];
const EMOTION = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const getRandomItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const getRandomItems = (array, maxCount) => {
  const arrayCopy = array.slice().sort(() => Math.random() - 0.5);
  return arrayCopy.slice(0, maxCount);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDate = () => {
  const minDayGap = 180;
  const maxDayGap = 680;
  const daysGap = getRandomInteger(-minDayGap, -maxDayGap);

  return dayjs().add(daysGap, 'day').toDate();
};

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

const comments = [ generateComments(1), generateComments(1)];

export const generateMovie = () => {
  return {
    id: null,
    film_info: {
      poster: getRandomItem(POSTER_LINK),
      titles: generateFilmTitle(),
      total_rating: generateTotalRating(),
      age_rating: getRandomItem(AGE_RATING),
      director: getRandomItem(DIRECTORS),
      writers: generateWrites(),
      actors: generateActors(),
      release: {
        date: generateDate(),
        release_country: getRandomItem(COUNTRY),
      },
      runtime: generateRuntime(),
      genre: generateGenre(),
      description: generateDesc(),
    },
    user_details: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      already_watched: Boolean(getRandomInteger(0, 1)),
      favorite: Boolean(getRandomInteger(0, 1)),
      watching_date: generateWatchDate(),
    },
    comments,
  };
};

console.log(generateMovie());
