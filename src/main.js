import FooterStatisticsView from './view/footer-statistics';
import {render} from './utils/render';
import FilmsModel from './model/films';
import FilterModel from './model/filter';
import FilmPresenter from './presenter/films';
import FilterPresenter from './presenter/filter';
import Api from './api/api.js';
import ProfileView from './view/profile';
import {UpdateType} from './const';
import Store from './api/store';
import Provider from './api/provider';

const AUTHORIZATION = 'Basic tsk290320';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';
const STORE_PREFIX = 'cinemaddict-localstorage';
const STORE_VER = 'v14';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsBlock = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const profileView = new ProfileView();
const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const successStartApp = (films) => {
  profileView.setData(films);
  filmsModel.setFilms(UpdateType.INIT, films);
  render(headerElement, profileView);
  render(footerStatisticsBlock, new FooterStatisticsView(films.length));
};

const errorStartApp = () => {
  filmsModel.setFilms(UpdateType.INIT, []);
  render(footerStatisticsBlock, new FooterStatisticsView(0));
};


const filmPresenter = new FilmPresenter(mainElement, filmsModel, filterModel, apiWithProvider, profileView);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);

filterPresenter.init();
filmPresenter.init();

apiWithProvider.getFilms()
  .then(successStartApp)
  .catch(errorStartApp);

// todo раскоментить
// window.addEventListener('load', () => {
//   navigator.serviceWorker.register('/sw.js');
// });

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
