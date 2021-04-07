import dayjs from 'dayjs';

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

const generatePosterLink = () => {
  const posterLink = [
    '../../public/images/posters/made-for-each-other.png',
    '../../public/images/posters/popeye-meets-sinbad.png',
    '../../public/images/posters/sagebrush-trail.jpg',
    '../../public/images/posters/santa-claus-conquers-the-martians.jpg',
    '../../public/images/posters/the-dance-of-life.jpg',
    '../../public/images/posters/the-great-flamarion.jpg',
    '../../public/images/posters/the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, posterLink.length - 1);

  return posterLink[randomIndex];
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
  return getRandomInteger(0.0, 10);
};

const generateAgeRating = () => {
  const ageRating = [
    '0+',
    '6+',
    '12+',
    '16+',
    '18+',
  ];

  const randomIndex = getRandomInteger(0, ageRating.length - 1);

  return ageRating[randomIndex];
};

const generateDirector = () => {
  const directors = [
    'Стив Джобс',
    'Билл Гейтс',
    'Илон Маск',
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
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
  const filmWrites = [];
  for (let i = 0; i < writesCount; i++) {
    const randomIndex = getRandomInteger(0, writes.length - 1);
    filmWrites.push(writes[randomIndex]);
    writes.splice(randomIndex, 1);
  }
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
  const filmActors = [];
  for (let i = 0; i < actorsCount; i++) {
    const randomIndex = getRandomInteger(0, actors.length - 1);
    filmActors.push(actors[randomIndex]);
    actors.splice(randomIndex, 1);
  }
  return filmActors;
};

const generateReleaseCountry = () => {
  const country = [
    'США',
    'Россия',
    'Франция',
    'Италия',
  ];
  const randomIndex = getRandomInteger(0, country.length - 1);

  return country[randomIndex];
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
  const filmGenre = [];
  for (let i = 0; i < genreCount; i++) {
    const randomIndex = getRandomInteger(0, genre.length - 1);
    filmGenre.push(genre[randomIndex]);
    genre.splice(randomIndex, 1);
  }
  return filmGenre;
};

const generateDesc = () => {
  const randomText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const textArray = randomText.split('.');
  const descArr = [];
  const genreCount = getRandomInteger(1, 5);
  for (let i = 0; i < genreCount; i++) {
    const randomIndex = getRandomInteger(0, textArray.length - 2);
    descArr.push(textArray[randomIndex]);
    textArray.splice(randomIndex, 1);
  }
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

const generateEmotion = () => {
  const emotion = [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ];

  const randomIndex = getRandomInteger(0, emotion.length - 1);

  return emotion[randomIndex];
};

export const generateComments = (id) => {
  return {
    id: id,
    author: 'Ilya O\'Reilly',
    comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    date: generateCommentDate(),
    emotion: generateEmotion(),
  };
};


const comments = [ generateComments(1), generateComments(1)];

export const generateMovie = () => {
  return {
    id: null,
    film_info: {
      poster: generatePosterLink(),
      titles: generateFilmTitle(),
      total_rating: generateTotalRating(),
      age_rating: generateAgeRating(),
      director: generateDirector(),
      writers: generateWrites(),
      actors: generateActors(),
      release: {
        date: generateDate(),
        release_country: generateReleaseCountry(),
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
