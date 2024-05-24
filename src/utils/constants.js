/**The index.js file must contain only the code for selecting elements, creating class instances, and adding specific event listeners. Other code, such as the array of initial cards and any configuration objects you are using, should be moved to a separate utils/constants.js file and imported into index.js */

export const cardWrapperSelector = ".cards__list";
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
export const editInputTitleEl = document.getElementById(editInputTitleId);
export const editInputDescriptionId = "modal-description-input";
export const editInputDescriptionEl = document.getElementById(
  editInputDescriptionId
);
export const addCardInputTitleId = "modal-image-title-input";
export const addCardInputLinkId = "modal-link-input";
export const addCardFormId = "add-card-form";
export const cardTempSelector = "#card-template";
export const profileEditBtn = document.querySelector("#profile-edit-button");
export const addCardBtn = document.querySelector(".profile__add-button");
export const picPopupSelector = "#open-pic-modal";
export const formValidators = {};
export const deleteCardPopup = document.querySelector("#delete-card-modal");
export const trashBtnArr = document.querySelectorAll(".card__trash");
export const avatarEditBtn = document.querySelector(
  "#profile-avatar-edit-button"
);
export const avatarEditModal = document.querySelector(
  "#change-profile-pic-modal"
);
export const avatarEditSelector = "#change-profile-pic-modal";
export const deleteCardSelector = "#delete-card-modal";
export const deleteCardEl = document.querySelector("#delete-card-modal");
export const deleteCardSubmitBtn = document.querySelector(
  "#delete-card-submit-btn"
);
export const avatarLinkInputId = "modal-avatar-input";
export const avatarImg = document.querySelector(".profile__photo");
export const avatarSelector = "#js-avatar";
