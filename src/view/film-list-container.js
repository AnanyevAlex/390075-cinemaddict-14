import {createElement} from '../utils';

const createFilmListContainer = () => {
  return '<div class="films-list__container"></div>';
};

export default class FilmListContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmListContainer();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
