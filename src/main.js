import FooterStatisticsView from './view/footer-statistics';
import {generateMovie} from './mock/movie';
import {generateFilter} from './mock/filter';
import {render} from './utils/render';

import FilmPresenter from './presenter/films';

const FILM_COUNT = 5;

// фильтрация фильмов
const films = new Array(FILM_COUNT).fill().map(generateMovie);
const filters = generateFilter(films);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const filmPresenter = new FilmPresenter(mainElement, headerElement);

const footerBlock = document.querySelector('.footer');
const footerStatisticsBlock = footerBlock.querySelector('.footer__statistics');

render (footerStatisticsBlock, new FooterStatisticsView(FILM_COUNT));

filmPresenter.init(films, filters);
