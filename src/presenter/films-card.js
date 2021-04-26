import FilmCardView from '../view/film-card';
import PopupFilmInfoView from '../view/popup-film-info';
import {deepClone} from '../utils/common';
import { render, RenderPosition, replace, remove } from '../utils/render';

const PopupControlType = {
  FAVORITE: 'favorite',
  WATCHLIST: 'watchlist',
  WATCHED: 'watched',
};

const PopupStatus = {
  OPEN: 'open',
  CLOSE: 'close',
};

export default class Movie {
  constructor(filmContainer, handleChangeData, handleChangeView) {
    this._filmContainer = filmContainer;
    this._handleChangeData = handleChangeData;

    this._filmCardComponent = null;
    this._filmPopupComponent = null;

    this._bodyElement = document.querySelector('body');
    this._footerBlock = document.querySelector('.footer');
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
  }

  init(films, popupStatus = PopupStatus.CLOSE) {

    this._film = films;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._filmPopupComponent;
    this._popupStatus = popupStatus;
    this._filmCardComponent = new FilmCardView(films);
    this._filmPopupComponent = new PopupFilmInfoView(this._film);

    this._filmCardComponent.setFilmCardClick(this._handleOpenPopup);
    this._filmCardComponent.setFilmCardWatchListClick(this._handleAddToWatchList);
    this._filmCardComponent.setFilmCardFavoritsClick(this._handleAddToFavorits);
    this._filmCardComponent.setFilmCardWatchedClick(this._handleAddToWatched);

    if (prevFilmCardComponent === null || prevPopupComponent === null) {
      render(this._filmContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmContainer.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._popupStatus === PopupStatus.OPEN) {
      this._filmPopupComponent = prevPopupComponent;
      return;
    }

    if (this._filmContainer.contains(prevPopupComponent.getElement())) {
      replace(this._filmPopupComponent, prevPopupComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevPopupComponent);


  }

  resetFilmView () {
    if (this._popupStatus === PopupStatus.OPEN) {
      this._closePopup();
      this._popupStatus = PopupStatus.CLOSE;
    }
  }

  _openPopup() {
    render(this._footerBlock, this._filmPopupComponent, RenderPosition.AFTEREND);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._filmPopupComponent.setCloseHandler(this._closePopup);
    this._filmPopupComponent.setPopupControlChange( this._handleChangePopupControlButton);
    this._bodyElement.classList.add('hide-overflow');
  }

  _closePopup() {
    this._filmPopupComponent.getElement().remove();
    this._filmPopupComponent.removeElement();
    this._popupStatus = PopupStatus.CLOSE;
    this._bodyElement.classList.remove('hide-overflow');
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closePopup(this._filmPopupComponent);
    }
  }

  _handleOpenPopup() {
    this._handleChangeView();
    this._popupStatus = PopupStatus.OPEN;
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._openPopup();
  }

  _updateFilmCardUserInfo (updateKey) {
    this._updateFilmCard = deepClone(this._film);
    this._updateFilmCard.userDetails[updateKey] = !this._updateFilmCard.userDetails[updateKey];
    this._handleChangeData(this._updateFilmCard, this._popupStatus);
  }

  _handleAddToWatchList () {
    this._updateFilmCardUserInfo('watchlist');
  }

  _handleAddToFavorits () {
    this._updateFilmCardUserInfo('favorite');
  }

  _handleAddToWatched () {
    this._updateFilmCardUserInfo('alreadyWatched');
  }

  _handleChangePopupControlButton (buttonType) {
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
}
