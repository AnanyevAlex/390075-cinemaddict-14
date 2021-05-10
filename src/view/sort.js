import AbstractView from './abstract';
import {SortType} from '../const';

const createSortTemplate = (currentSortType) => {
  return `<ul class="sort">
    <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''}">Sort by default</a></li>
    <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button ${currentSortType === SortType.DATE ? 'sort__button--active' : ''}" >Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortType.RATE}" class="sort__button ${currentSortType === SortType.RATE ? 'sort__button--active' : ''}">Sort by rating</a></li>
  </ul>`;
};

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._currentSortType = currentSortType;
  }
  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
