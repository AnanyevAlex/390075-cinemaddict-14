import SmartView from './smart';
import {dateRelese, getCommentDate, getTimeFromMins, getStringOFArray, isChecked} from '../utils/film';
import {generateComments} from '../mock/movie';
import he from 'he';

const createCommentsTemplate = (comments) => {
  return `
  <ul class="film-details__comments-list">
    ${comments.map((item) => `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${item.emotion}.png" width="55" height="55" alt="emoji-${item.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(item.comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${item.author}</span>
          <span class="film-details__comment-day">${getCommentDate(item.date)}</span>
          <button class="film-details__comment-delete" data-comment-id="${item.id}">Delete</button>
        </p>
      </div>
    </li>
    `,
  ).join('')}
  </ul>`;
};

const createGenresTemplate = (genres) => {
  return `<tr class="film-details__row">
              <td class="film-details__term">${genres.length > 1 ? 'Genres' : 'Genre'}</td>
              <td class="film-details__cell">
              ${genres.map((item) => `
              <span className="film-details__genre">${item}</span>
              `).join('')}
              </td>
            </tr>`;
};

const createPopupFilmInfo = (data, comment) => {
  const { filmInfo, currentEmoji, currentTextComment } = data;
  const userDetails = comment;
  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

          <p class="film-details__age">${filmInfo.ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmInfo.titles.title}</h3>
              <p class="film-details__title-original">${filmInfo.titles.altTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmInfo.totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${getStringOFArray(filmInfo.writers)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${getStringOFArray(filmInfo.actors)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dateRelese(filmInfo.release.date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${getTimeFromMins(filmInfo.runtime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
            </tr>
            ${createGenresTemplate(filmInfo.genre)}
          </table>

          <p class="film-details__film-description">${filmInfo.description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" ${isChecked(userDetails.watchlist)} id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" ${isChecked(userDetails.alreadyWatched)} id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" ${isChecked(userDetails.favorite)} id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${data.comments.length}</span></h3>

        ${createCommentsTemplate(userDetails)}

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
          ${currentEmoji ? `<img src="images/emoji/${currentEmoji}.png" width="55" height="55" alt="emoji-smile">`: ''}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${!currentTextComment ? '' : currentTextComment}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class PopupFilmInfo extends SmartView {
  constructor(film, comments) {
    super();
    this._data = PopupFilmInfo.parseFilmCardToState(film);
    this._comments = comments;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._handleControlButton = this._handleControlButton.bind(this);
    this._handleEmojiChange = this._handleEmojiChange.bind(this);
    this._descriptionInputHandler = this._descriptionInputHandler.bind(this);
    this._handleSendNewComment = this._handleSendNewComment.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupFilmInfo(this._data, this._comments);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setPopupControlChange(this._callback.inputControlPopup);
    this.setCloseHandler (this._callback.editClick);
  }

  reset(filmCard) {
    this.updateData(
      PopupFilmInfo.parseFilmCardToState(filmCard),
    );
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._handleEmojiChange);
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._descriptionInputHandler);
    this.getElement().addEventListener('keydown', this._handleSendNewComment);
    this.getElement().querySelector('.film-details__comments-list').addEventListener('click', this._handleDeleteComment);
  }

  _handleControlButton(evt) {
    evt.preventDefault();
    this._callback.inputControlPopup(evt.target.id);
  }
  _handleEmojiChange (evt) {
    evt.preventDefault();
    this.updateData({currentEmoji: evt.target.value});
  }
  _descriptionInputHandler (evt) {
    evt.preventDefault();
    this.updateData({currentTextComment: evt.target.value}, true);
  }
  setPopupControlChange(callback) {
    this._callback.inputControlPopup = callback;
    this.getElement().querySelector('.film-details__controls').addEventListener('change', this._handleControlButton);
  }
  setCloseHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._editClickHandler);
  }

  _handleSendNewComment(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.keyCode == 13) {
      if ( !this._data.currentEmoji || !this._data.currentTextComment){
        return;
      }
      this._data = PopupFilmInfo.parseStateToFilmCard(this._data);
      this._callback.setSendNewComment(this._data);
      this.updateElement();
    }
  }

  _handleDeleteComment(evt) {
    if (!evt.target.classList.contains('film-details__comment-delete')) {
      return;
    }
    evt.preventDefault();
    this._callback.deleteComment(evt.target.dataset.commentId);
  }

  setSendNewComment(callback) {
    this._callback.setSendNewComment = callback;
  }

  setDeleteComment(callback) {
    this._callback.deleteComment = callback;
  }

  static parseFilmCardToState(filmCard) {
    return Object.assign (
      {},
      filmCard,
      {
        currentEmoji: 'currentEmoji' in filmCard,
        currentTextComment: '',
      },
    );
  }

  static parseStateToFilmCard(filmCard) {
    filmCard = Object.assign({}, filmCard);
    const newComment = generateComments();
    newComment.comment = filmCard.currentTextComment;
    newComment.emotion = filmCard.currentEmoji;
    filmCard.filmInfo.comments.push(newComment);
    delete filmCard.currentTextComment;
    delete filmCard.currentEmoji;
    return filmCard;
  }
}
