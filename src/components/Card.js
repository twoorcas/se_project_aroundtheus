export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this._cardSelector = cardSelector;
    this._data = data;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
  }
  _getTemplate() {
    return (this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true));
  }

  _setEventListeners() {
    this._likeBtn = this._cardElement.querySelector(".card__button");
    this._trashBtn = this._cardElement.querySelector(".card__trash");

    this._likeBtn.addEventListener("click", () => {
      this._handleLikeBtn();
    });
    this._trashBtn.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }
  deleteCard() {
    this._cardElement.remove();
  }
  _handleLikeBtn() {
    this._likeBtn.classList.toggle("card__button-active");
  }

  getView() {
    this._element = this._getTemplate();
    this._cardImageElement = this._element.querySelector(".card__image");
    this._element.querySelector(".card__description").textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}
