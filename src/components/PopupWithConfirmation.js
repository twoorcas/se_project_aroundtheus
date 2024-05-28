import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitBtn = this._popupElement.querySelector(".modal__save");
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
  }
}
