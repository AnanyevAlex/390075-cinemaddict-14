import FooterStatisticsView from './view/footer-statistics';
import {render} from './utils/render';
import FilmsModel from './model/films';
import FilterModel from './model/filter';
import FilmPresenter from './presenter/films';
import HeaderView from './view/header';
import FilterPresenter from './presenter/filter';
import Api from './api.js';
import {UpdateType} from './const';

const AUTHORIZATION = 'Basic tsk290320';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();


const filmPresenter = new FilmPresenter(mainElement, filmsModel, filterModel, api);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);

const footerBlock = document.querySelector('.footer');
const footerStatisticsBlock = footerBlock.querySelector('.footer__statistics');


filterPresenter.init();
filmPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    render(headerElement, new HeaderView());
    render (footerStatisticsBlock, new FooterStatisticsView(films.length));
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
