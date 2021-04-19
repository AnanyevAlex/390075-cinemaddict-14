import AbstractView from './abstract';

const createFilmExtraBlockTemplate = () => {
  return '<section class="films-list films-list--extra"></section>';
};

export default class FilmExtraBlock extends AbstractView {
  getTemplate() {
    return createFilmExtraBlockTemplate();
  }
}
