import AbstractView from './abstract';

const createNavItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return `
      <a href="#${name}" data-filter="${type}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">${name} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createNavTemplate = (filterItems, currentFilterTyp) => {
  const filterItemsTemplate = filterItems.map((filter) => createNavItemTemplate(filter, currentFilterTyp)).join('');
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
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
    if (!evt.target.classList.contains('main-navigation__item')) {
      return;
    }
    this._callback.filterTypeChange(evt.target.dataset.filter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
