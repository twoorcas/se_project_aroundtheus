import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    this.__inputObj = {};
    this.__inputEls = this._popupForm.querySelectorAll(".modal__input");
    this.__inputEls.forEach((inputEl) => {
      this.__inputObj[inputEl.id] = inputEl.vale;
    });
    return this.__inputObj;
  }
  // collects data from all the input fields and returns it as an object. This data should then be passed to the submission handler as an argument.//

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", () => {
      this._handleFormSubmit;
    });
  }
}
