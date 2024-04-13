import { ESC_KEYCODE } from "../utils/constants";
export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  /* open and close the popup. The open() method should be called in the preexisting event handlers in index.js.
 _handleEscClose() that stores the logic for closing the popup by pressing the Esc key.
setEventListeners() that adds a click event listener to the close icon of the popup + close when users click on the shaded area around the form.*/
  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }
  _clickOverlay() {
    if (e.target === this._popupElement) {
      this.close();
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener("click", (e) => {
      this._clickOverlay();
    });
    this._closeBtn = this._popupElement.querySelector(".modal__close");
    this._closeBtn.addEventListener("click", () => this.close());
  }
}
