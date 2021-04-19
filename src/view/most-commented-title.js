import AbstractView from './abstract';

const createMostCommentedTitle = () => {
  return '<h2 class="films-list__title">Most commented</h2>';
};

export default class MostCommentedTitle extends AbstractView {
  getTemplate() {
    return createMostCommentedTitle();
  }
}
