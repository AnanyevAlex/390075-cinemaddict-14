import {createElement} from '../utils';

const createTopRatedTitleTemplate = () => {
  return '<h2 class="films-list__title">Top rated</h2>';
};

export default class TopRatedTitle {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTopRatedTitleTemplate();
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
