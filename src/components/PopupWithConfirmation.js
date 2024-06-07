import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitBtn = this._popupElement.querySelector(".modal__save");
    this._btnText = this._submitBtn.textContent;
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }
  showLoading() {
    this._submitBtn.innerText = "Loading";
  }
  showDeleted() {
    this._submitBtn.innerText = this._btnText;
  }
  setEventListeners() {
    super.setEventListeners();
    this._submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
  }
}
