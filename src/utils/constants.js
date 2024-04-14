/**The index.js file must contain only the code for selecting elements, creating class instances, and adding specific event listeners. Other code, such as the array of initial cards and any configuration objects you are using, should be moved to a separate utils/constants.js file and imported into index.js */
export const ESC_KEYCODE = 27;
export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
export const cardWrapperSelector = ".cards__list";
// export const openPicImage = openPicModal.querySelector("#open-pic-image");
// export const openPicTitle = openPicModal.querySelector("#open-pic-title");
export const formList = document.querySelectorAll(".modal__form");
export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  errorList: ".modal__error",
};
export const nameSelector = "#js-profile-name";
export const jobSelector = "#js-profile-description";
export const addCardPopupSelector = "#profile-add-card-modal";
export const editPopupSelector = "#profile-edit-modal";
export const editInputTitleId = "modal-title-input";
export const editInputDescriptionId = "modal-description-input";
export const addCardInputTitleId = "modal-image-title-input";
export const addCardInputLinkId = "modal-link-input";
export const addCardFormId = "add-card-form";
export const cardTempSelector = "#card-template";
export const profileEditBtn = document.querySelector("#profile-edit-button");
export const addCardBtn = document.querySelector(".profile__add-button");
