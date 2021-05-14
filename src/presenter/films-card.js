import FilmCardView from '../view/film-card';
import PopupFilmInfoView from '../view/popup-film-info';
import {deepClone} from '../utils/common';
import { render, replace, remove } from '../utils/render';
import { PopupStatus, PopupControlType, UpdateType, UserAction } from '../const';

export default class Movie {
  constructor(filmContainer, handleChangeData, handleChangeView, api) {
    this._filmContainer = filmContainer;
    this._handleChangeData = handleChangeData;

    this._filmCardComponent = null;
    this._filmPopupComponent = null;
    this._api = api
    this._bodyElement = document.querySelector('body');
    this._popupStatus = PopupStatus.CLOSE;
    this._handleChangeView = handleChangeView;
    this._openPopup = this._openPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleOpenPopup = this._handleOpenPopup.bind(this);
    this._handleAddToWatchList = this._handleAddToWatchList.bind(this);
    this._handleAddToFavorits = this._handleAddToFavorits.bind(this);
    this._handleAddToWatched = this._handleAddToWatched.bind(this);
    this._handleChangePopupControlButton = this._handleChangePopupControlButton.bind(this);
    this._handleSendNewComment = this._handleSendNewComment.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
  }

  init(film) {

    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._filmPopupComponent;
    this._filmCardComponent = new FilmCardView(film);
    this._filmPopupComponent = new PopupFilmInfoView(this._film);
    this._filmCardComponent.setFilmCardClick(this._handleOpenPopup);
    this._filmCardComponent.setFilmCardWatchListClick(this._handleAddToWatchList);
    this._filmCardComponent.setFilmCardFavoritsClick(this._handleAddToFavorits);
    this._filmCardComponent.setFilmCardWatchedClick(this._handleAddToWatched);
    this._filmPopupComponent.setCloseHandler(this._closePopup);
    this._filmPopupComponent.setPopupControlChange(this._handleChangePopupControlButton);
    this._filmPopupComponent.setSendNewComment(this._handleSendNewComment);
    this._filmPopupComponent.setDeleteComment(this._handleDeleteComment);

    if (prevFilmCardComponent === null || prevPopupComponent === null) {
      render(this._filmContainer, this._filmCardComponent);
      return;
    }

    if (this._filmContainer.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._popupStatus === PopupStatus.OPEN) {
      if (document.body.contains(prevPopupComponent.getElement())) {
        replace(this._filmPopupComponent, prevPopupComponent);
      }
    }
    remove(prevFilmCardComponent);
    remove(prevPopupComponent);
  }

  resetFilmView() {
    if (this._popupStatus === PopupStatus.OPEN) {
      this._closePopup();
      this._popupStatus = PopupStatus.CLOSE;
    }
  }

  _openPopup() {
    render(document.body, this._filmPopupComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._bodyElement.classList.add('hide-overflow');
  }

  _closePopup() {
    this._filmPopupComponent.getElement().remove();
    this._popupStatus = PopupStatus.CLOSE;
    this._bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._filmPopupComponent.reset(this._film);
      this._closePopup(this._filmPopupComponent);
    }
  }

  _handleOpenPopup() {
    this._handleChangeView();
    this._popupStatus = PopupStatus.OPEN;
    this._openPopup();
  }

  _updateFilmCardUserInfo(updateKey) {
    this._updateFilmCard = deepClone(this._film);
    this._updateFilmCard.userDetails[updateKey] = !this._updateFilmCard.userDetails[updateKey];
    this._handleChangeData(UserAction.UPDATE, UpdateType.PATH, this._updateFilmCard, this._popupStatus);
  }

  _handleAddToWatchList() {
    this._updateFilmCardUserInfo('watchlist');
  }

  _handleAddToFavorits() {
    this._updateFilmCardUserInfo('favorite');
  }

  _handleAddToWatched() {
    this._updateFilmCardUserInfo('alreadyWatched');
  }

  _handleChangePopupControlButton(buttonType) {
    if (buttonType === PopupControlType.WATCHLIST) {
      this._updateFilmCardUserInfo('watchlist');
    }

    if (buttonType === PopupControlType.FAVORITE) {
      this._updateFilmCardUserInfo('favorite');
    }

    if (buttonType === PopupControlType.WATCHED) {
      this._updateFilmCardUserInfo('alreadyWatched');
    }
  }
  destroy() {
    remove(this._filmCardComponent);
  }

  _handleSendNewComment(updateFilmCard) {
    this._handleChangeData(UserAction.UPDATE, UpdateType.PATH, updateFilmCard, this._popupStatus);
  }

  _handleDeleteComment(commnetID) {
    const updatedFilmCard = deepClone(this._film);
    const comment = updatedFilmCard.filmInfo.comments.filter((comment) => comment.id !== commnetID);
    updatedFilmCard.filmInfo.comments = comment;
    this._handleChangeData(UserAction.DELETE_COMMENT, UpdateType.PATH, updatedFilmCard, this._popupStatus);
  }
}
