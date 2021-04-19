import AbstractView from './abstract';

const createTopRatedTitleTemplate = () => {
  return '<h2 class="films-list__title">Top rated</h2>';
};

export default class TopRatedTitle extends AbstractView {
  getTemplate() {
    return createTopRatedTitleTemplate();
  }
}
