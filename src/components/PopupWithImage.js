import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector, { name, link }) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._picTitle = this._popupElement.querySelector("#open-pic-title");
    this._image = this._popupElement.querySelector("#open-pic-image");
  }
  open() {
    this._picTitle.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    super.open();
  }
}
