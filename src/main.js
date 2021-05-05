import FooterStatisticsView from './view/footer-statistics';
import {generateMovie} from './mock/movie';
import {generateFilter} from './mock/filter';
import {render} from './utils/render';
import FilmsModel from './model/films';
import FilmPresenter from './presenter/films';

const FILM_COUNT = 15;

// фильтрация фильмов
const films = new Array(FILM_COUNT).fill().map(generateMovie);
const filters = generateFilter(films);

const filmsModel = new FilmsModel();
filmsModel.setFilms();

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const filmPresenter = new FilmPresenter(mainElement, headerElement, filmsModel);

const footerBlock = document.querySelector('.footer');
const footerStatisticsBlock = footerBlock.querySelector('.footer__statistics');

render (footerStatisticsBlock, new FooterStatisticsView(FILM_COUNT));

filmPresenter.init(films, filters);
