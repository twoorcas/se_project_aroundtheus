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
console.log(initialCards);
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

/*function & handlers*/
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

function handleProfileSubmit(e) {
  e.preventDefault();
  profileName.innerText = profileTitleInput.value;
  profileDescription.innerText = profileDescriptionInput.value;
  closePopup();
}

function getCardElement(data) {
  const cardElement = cardTemp.cloneNode(true);
  const cardTitle = data.name;
  const cardLink = data.link;
  const cardTitleEl = cardElement.querySelector(".card__description");
  cardTitleEl.innerText = cardTitle;
  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.src = cardLink;
  cardImageEl.alt = cardTitle;
  return cardElement;
}

/*event listeners*/
profileEditBtn.addEventListener("click", function () {
  profileTitleInput.value = profileName.innerText;
  profileDescriptionInput.value = profileDescription.innerText;
  profileEditModal.classList.add("modal_opened");
});

profileEditModalCloseBtn.addEventListener("click", closePopup);

profileForm.addEventListener("submit", handleProfileSubmit);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListEl.append(cardElement);
});
