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
/*functions*/
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}
function openPopup(modal) {
  modal.classList.add("modal_opened");
}
function handleProfileSubmit(e) {
  e.preventDefault();
  profileName.innerText = profileTitleInput.value;
  profileDescription.innerText = profileDescriptionInput.value;
  closePopup(profileEditModal);
  e.target.reset();
}
function handleAddCardSubmit(e) {
  e.preventDefault();
  const addCardTitle = addCardTitleInput.value;
  const addCardImageLInk = addCardImageLinkInput.value;
  const cardElement = getCardElement({
    name: addCardTitle,
    link: addCardImageLInk,
  });
  cardListEl.prepend(cardElement);
  closePopup(addCardModal);
  e.target.reset();
}
function getCardElement(data) {
  const cardElement = cardTemp.cloneNode(true);
  const cardTitle = data.name;
  const cardLink = data.link;
  const cardTitleEl = cardElement.querySelector(".card__description");
  const cardLikeBtn = cardElement.querySelector(".card__button");

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__button-active");
  });
  const trashBtn = cardElement.querySelector(".card__trash");
  trashBtn.addEventListener("click", () => {
    cardElement.remove();
  });
  cardTitleEl.innerText = cardTitle;
  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.src = cardLink;
  cardImageEl.alt = cardTitle;

  cardImageEl.addEventListener("click", () => {
    openPicImage.src = data.link;
    openPicImage.alt = data.name;
    openPicTitle.textContent = data.name;
    openPopup(openPicModal);
  });
  return cardElement;
}

/*event listeners*/
// edit popup
profileEditBtn.addEventListener("click", function () {
  profileTitleInput.value = profileName.innerText;
  profileDescriptionInput.value = profileDescription.innerText;
  openPopup(profileEditModal);
});
profileForm.addEventListener("submit", handleProfileSubmit);
// add card popup
addCardBtn.addEventListener("click", () => openPopup(addCardModal));
addCardForm.addEventListener("submit", handleAddCardSubmit);
// all close btn
const closeBtns = document.querySelectorAll(".modal__close");
closeBtns.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListEl.append(cardElement);
});
