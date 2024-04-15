import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this.__inputEls = this._popupForm.querySelectorAll(".modal__input");
  }
  _getInputValues() {
    this.__inputObj = {};
    this.__inputEls.forEach((inputEl) => {
      this.__inputObj[inputEl.id] = inputEl.value;
    });
    return this.__inputObj;
  }
  reset() {
    this._popupForm.reset();
  }
  //{'#id1something':modal__input.value,'#id1something':modal__input.value}

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
