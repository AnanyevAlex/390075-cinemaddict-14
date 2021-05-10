import FooterStatisticsView from './view/footer-statistics';
import {generateMovie} from './mock/movie';
import {render} from './utils/render';
import FilmsModel from './model/films';
import FilterModel from './model/filter';
import FilmPresenter from './presenter/films';
import HeaderView from './view/header';
import FilterPresenter from './presenter/filter';

const FILM_COUNT = 15;

const films = new Array(FILM_COUNT).fill().map(generateMovie);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
render(headerElement, new HeaderView());
const filmPresenter = new FilmPresenter(mainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);

const footerBlock = document.querySelector('.footer');
const footerStatisticsBlock = footerBlock.querySelector('.footer__statistics');

render (footerStatisticsBlock, new FooterStatisticsView(FILM_COUNT));

filterPresenter.init();
filmPresenter.init();
