import AbstractView from './abstract';
import {FilterType} from '../const';

const createNavItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return `
      <a href="#${name}" data-filter="${type}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}"> ${name} ${type === FilterType.ALL_MOVIES ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>`;
};

const createNavTemplate = (filterItems, currentFilterTyp) => {
  const filterItemsTemplate = filterItems.map((filter) => createNavItemTemplate(filter, currentFilterTyp)).join('');
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filterItemsTemplate}
    </div>
    <a href="#stats" data-filter="${FilterType.STATS}" class="main-navigation__additional ${currentFilterTyp === FilterType.STATS ? 'main-navigation__additional--active' : ''}">Stats</a>
  </nav>`;
};


export default class Nav extends AbstractView {
  constructor(filter, currentFilterType) {
    super();
    this._filter = filter;
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createNavTemplate(this._filter, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    const navLink = evt.target.classList.contains('main-navigation__item') || evt.target.classList.contains('main-navigation__additional');
    if (!navLink) {
      return;
    }
    this._callback.filterTypeChange(evt.target.dataset.filter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
