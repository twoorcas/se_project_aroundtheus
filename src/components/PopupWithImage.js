import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor({ name, link }) {
    super({ popupSelector });
    this._name = name; //{ name, link } is from card
    this._link = link;
  }
  open() {
    // set the image's src and alt
    // set the caption's textContent. this is handleImageClick
    this._popupElement.querySelector("#open-pic-title").textContent =
      this._name;
    const image = this._popupElement.querySelector("#open-pic-image");
    image.src = this._link;
    image.alt = this._name;
    super.open();
  }
}
//const imagePopup = new PopupWithImage({name, link});
// imagePopup.setEventListeners()
