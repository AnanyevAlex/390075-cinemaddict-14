import {createElement} from '../utils';

const createMostCommentedTitle = () => {
  return '<h2 class="films-list__title">Most commented</h2>';
};

export default class MostCommentedTitle {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMostCommentedTitle();
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
