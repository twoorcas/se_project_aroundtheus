import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
const initialCards = [
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

/*elements*/
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalCloseBtn = document.querySelector(
  "#profile-edit-modal-close-btn"
);
const profileTitleInput = document.querySelector("#modal-title-input");
const profileDescriptionInput = document.querySelector(
  "#modal-description-input"
);
const profileName = document.querySelector("#js-profile-name");
const profileDescription = document.querySelector("#js-profile-description");
const profileForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemp =
  document.querySelector("#card-template").content.firstElementChild;
const addCardBtn = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#profile-add-card-modal");
const addCardModalCloseBtn = addCardModal.querySelector(
  "#profile-add-card-modal-close-btn"
);
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardTitleInput = addCardForm.querySelector("#modal-image-title-input");
const addCardImageLinkInput = addCardForm.querySelector("#modal-link-input");
const openPicModal = document.querySelector("#open-pic-modal");
const openPicImage = openPicModal.querySelector("#open-pic-image");
const openPicTitle = openPicModal.querySelector("#open-pic-title");
const openPicCloseBtn = openPicModal.querySelector("#open-pic-modal-close-btn");
const modalEls = [...document.querySelectorAll(".modal")];
const addModalSubmitButton = addCardModal.querySelector(".modal__save");

const editModalSubmitButton = profileEditModal.querySelector(".modal__save");

/*functions*/
function handleClosePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", pressEsc);
}
function handleOpenPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", pressEsc);
}
function handleDisableSubmitButton(submitButton) {
  submitButton.disabled = true;
  submitButton.classList.add("modal__save_disabled");
}
function handleProfileSubmit(e) {
  e.preventDefault();
  profileName.innerText = profileTitleInput.value;
  profileDescription.innerText = profileDescriptionInput.value;
  handleDisableSubmitButton(editModalSubmitButton);
  handleClosePopup(profileEditModal);
}
function handleAddCardSubmit(e) {
  e.preventDefault();
  const addCardTitle = addCardTitleInput.value;
  const addCardImageLInk = addCardImageLinkInput.value;
  const cardElement = new Card(
    { name: addCardTitle, link: addCardImageLInk },
    "#card-template",
    handleImageClick
  );
  cardListEl.prepend(cardElement.getView());
  handleDisableSubmitButton(addModalSubmitButton);
  handleClosePopup(addCardModal);
  handleResetValidation(addCardModal);
  e.target.reset();
}

function handleImageClick(data) {
  openPicImage.src = data.link;
  openPicImage.alt = data.name;
  openPicTitle.textContent = data.name;
  handleOpenPopup(openPicModal);
}
function clickOverlay() {
  modalEls.forEach((modalEl) => {
    modalEl.addEventListener("click", (e) => {
      if (e.target === modalEl) {
        handleClosePopup(modalEl);
      }
    });
  });
}
clickOverlay();

function pressEsc(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    handleClosePopup(openedPopup);
  }
}
function handleResetValidation(modal) {
  const modalErrorMessages = modal.querySelectorAll(".modal__error");
  const modalInputs = modal.querySelectorAll(".modal__input");
  modalErrorMessages.forEach((message) => {
    message.textContent = "";
    message.classList.remove("modal__error_visible");
    modalInputs.forEach((modalInput) => {
      modalInput.classList.remove("modal__input_type_error");
    });
  });
}
/*event listeners*/
// edit popup
profileEditBtn.addEventListener("click", function () {
  profileTitleInput.value = profileName.innerText;
  profileDescriptionInput.value = profileDescription.innerText;
  handleResetValidation(editModal);
  handleOpenPopup(profileEditModal);
});
profileForm.addEventListener("submit", handleProfileSubmit);
// add card popup
addCardBtn.addEventListener("click", () => handleOpenPopup(addCardModal));
addCardForm.addEventListener("submit", handleAddCardSubmit);
// all close btn
const closeBtns = document.querySelectorAll(".modal__close");
closeBtns.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => handleClosePopup(popup));
});
/*render cards*/
initialCards.forEach((data) => {
  const card = new Card(data, "#card-template", handleImageClick);
  cardListEl.append(card.getView());
});

/*form validation*/
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const editModal = document.querySelector("#profile-edit-modal");
const addModal = document.querySelector("#profile-add-card-modal");
const editFormValidator = new FormValidator(settings, editModal);
const addFormValidator = new FormValidator(settings, addModal);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
