import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit, card) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._card = card;
  }

  setDelEventListener() {
    this._handleFormSubmit = handleFormSubmit;

    console.log(this._handleFormSubmit);
    this.deleteCardSubmitBtn = this._popupElement.querySelector(
      "#delete-card-submit-btn"
    );
    this.deleteCardSubmitBtn.addEventListener("click", () => {
      this._handleFormSubmit(this);
    });
  }
}
