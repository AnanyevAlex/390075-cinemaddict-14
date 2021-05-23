import { getStatus } from '../utils/stats.js';
import Smart from '../view/smart.js';

const createHeaderProfileTemplate = (films) => {
  const watchedFilms = films.filter((film) => film.userDetails.alreadyWatched);
  const userStatus = getStatus(watchedFilms.length);

  return `<section class="header__profile profile">
  <p class="profile__rating">${userStatus}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};


export default class Profile extends Smart {
  constructor() {
    super();
    this._data = null;
  }

  setData(data) {
    this._data = data.slice();
  }

  getTemplate() {
    return createHeaderProfileTemplate(this._data);
  }

  updateData(data) {
    this._data = data.slice();
    this.updateElement();
  }

  restoreHandlers() { }
}
