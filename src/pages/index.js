import Card from "../components/Card.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import {
  avatarEditBtn,
  avatarEditSelector,
  trashBtnArr,
  deleteCardPopup,
  settings,
  formValidators,
  picPopupSelector,
  profileEditBtn,
  addCardBtn,
  formList,
  addCardInputTitleId,
  addCardInputLinkId,
  cardTempSelector,
  addCardFormId,
  editInputTitleId,
  editInputDescriptionId,
  addCardPopupSelector,
  editPopupSelector,
  nameSelector,
  jobSelector,
  initialCards,
  cardWrapperSelector,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

// handler
function handleAssignEditInput() {
  const userProfileData = userProfile.getUserInfo();
  editPopup.setInputValues(userProfileData);
}
function handleAvatarSubmit(inputObj) {
  avatarEditPopup.close();
}
// submit????
function handleProfileSubmit(inputObj) {
  const nameEl = inputObj[editInputTitleId];
  const jobEl = inputObj[editInputDescriptionId];
  api.updateUserInfo({
    editFormNameInput: nameEl,
    editFormAboutInput: jobEl,
  });
  // sent inputs to server
  userProfile.setUserInfo(nameEl, jobEl);
  // get userinfo from server and apply to profile
  editPopup.close();
}
function creatCard(item) {
  const cardElement = new Card(item, cardTempSelector, handleImageClick);
  const cardItem = cardElement.getView();
  return cardItem;
}
function handleAddCardSubmit(inputObj) {
  addCardPopup.close();
  const newCard = creatCard({
    name: inputObj[addCardInputTitleId],
    link: inputObj[addCardInputLinkId],
  });
  cardList.addItem(newCard);
  formValidators[addCardFormId].disableSubmitButton();
  addCardPopup.reset();
}

function handleImageClick({ name, link }) {
  imageInfo.open({ name, link });
}

// form validation
const enableValidation = (formList) => {
  formList.forEach((form) => {
    const formValidator = new FormValidator(settings, form);
    formValidator.enableValidation();
    formValidators[form.getAttribute("id")] = formValidator;

    return formValidators;
  });
};

// api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "62fbc1de-42d6-41b7-8bb5-5b0736932e96",
    "Content-Type": "application/json",
  },
});

// get initial user info from server
// function loadUserInfo() {
//   api.getUserInfo().then((res) => {
//     const name = res.name;
//     const job = res.about;
//     userProfile.setUserInfo(name, job);
//   });
// }
// loadUserInfo();

// get initial cards from server
// api.getInitialCards().then((res) => {
//   console.log(res);
// });

// promise.all

api.getCardAndUserInfo().then(([serverCardList, serverUserInfo]) => {});

// api.getUserInfo().then((res) => {
//   console.log(res);
// });

// api.updateUserInfo({
//   editFormNameInput: "Jacques Cousteau",
//   editFormAboutInput: "Explorer",
// });
// .then((res) => {
//   console.log(res);
// });

// api.deleteCard({ _id: "664993188bacc8001af143f3" });
api.addNewCard({
  cardElementName: "Bald Mountains",
  cardElementLink:
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
});

// api.updateProfileImage().then((res) => {
//   console.log(res);
// });
// api.renderCards().then((res) => {
//   console.log(res);
// });

// elements
const imageInfo = new PopupWithImage(picPopupSelector);
const userProfile = new UserInfo({ nameSelector, jobSelector });
const addCardPopup = new PopupWithForm(
  addCardPopupSelector,
  handleAddCardSubmit
);
const editPopup = new PopupWithForm(editPopupSelector, handleProfileSubmit);
const avatarEditPopup = new PopupWithForm(avatarEditSelector);
// handle????

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardItem = creatCard(item);
      cardList.addInitialItem(cardItem);
    },
  },
  cardWrapperSelector
);

// function calls and event listeners
addCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});
profileEditBtn.addEventListener("click", () => {
  editPopup.open();
  handleAssignEditInput();
});
trashBtnArr.forEach((trashBtn) => {
  trashBtn.addEventListener("click", () => {
    deleteCardPopup.open();
  });
});
avatarEditBtn.addEventListener("click", () => {});
//?????

// setEventListeners
enableValidation(formList);
addCardPopup.setEventListeners();
editPopup.setEventListeners();
imageInfo.setEventListeners();
avatarEditPopup.setEventListeners();
