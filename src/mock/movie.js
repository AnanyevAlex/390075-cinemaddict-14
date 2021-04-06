import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDate = () => {
  return dayjs().toDate();
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

export const generateMovie = () => {
  return {
    id: null,
    film_info: {
      poster: generatePosterLink(),
      titles: generateFilmTitle(),
      total_rating: generateTotalRating(),
      age_rating: generateAgeRating(),
      director: null,
      writers: [],
      actors: [],
      release: {
        date: generateDate(),
        release_country: null,
      },
      runtime: null,
      genre: [],
      description: null,
    },
    user_details: {
      watchlist: false,
      already_watched: false,
      favorite: false,
      watching_date: null,
    },
    comments: null,
  };
};

console.log(generateMovie());
