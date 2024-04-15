import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this._name = name;
    // this._link = link;
    this._picTitle = this._popupElement.querySelector("#open-pic-title");
    this._image = this._popupElement.querySelector("#open-pic-image");
  }
  open({ name, link }) {
    this._picTitle.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}
