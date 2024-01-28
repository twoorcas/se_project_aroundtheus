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

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

profileEditBtn.addEventListener("click", function () {
  profileTitleInput.value = profileName.innerText;
  profileDescriptionInput.value = profileDescription.innerText;
  profileEditModal.classList.add("modal_opened");
});
profileEditModalCloseBtn.addEventListener("click", closePopup);
profileForm.addEventListener("submit", function (e) {
  e.preventDefault();
  profileName.innerText = profileTitleInput.value;
  profileDescription.innerText = profileDescriptionInput.value;
  closePopup();
});