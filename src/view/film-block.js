import AbstractView from './abstract';

const createFilmBlockTemplate = () => {
  return `<section class='films'>
    <section class='films-list'>
      <h2 class='films-list__title visually-hidden'>All movies. Upcoming</h2>

      </section></section>`;
};

export default class FilmBlock extends AbstractView {
  getTemplate() {
    return createFilmBlockTemplate();
  }
}
