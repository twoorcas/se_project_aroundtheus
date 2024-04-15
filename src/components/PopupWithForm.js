import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputEls = this._popupForm.querySelectorAll(".modal__input");
  }
  _getInputValues() {
    this._inputObj = {};
    this._inputEls.forEach((inputEl) => {
      this._inputObj[inputEl.id] = inputEl.value;
    });
    return this._inputObj;
  }
  reset() {
    this._popupForm.reset();
  }
  //{'#id1something':modal__input.value,'#id1something':modal__input.value}

  setInputValues(data) {
    this._inputEls.forEach((input) => {
      input.value = data[input.name];
    });
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
