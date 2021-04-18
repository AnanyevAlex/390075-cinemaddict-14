import {createElement} from '../utils';

const createFilmExtraBlockTemplate = () => {
  return '<section class="films-list films-list--extra"></section>';
};

export default class FilmExtraBlock {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmExtraBlockTemplate();
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
