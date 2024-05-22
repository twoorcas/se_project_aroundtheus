import Card from "../components/Card.js";
import Api from "../utils/Api.js";
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
  cardWrapperSelector,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

// elements
let cardList;
const imageInfo = new PopupWithImage(picPopupSelector);
const userProfile = new UserInfo({ nameSelector, jobSelector });
const addCardPopup = new PopupWithForm(
  addCardPopupSelector,
  handleAddCardSubmit
);
const editPopup = new PopupWithForm(editPopupSelector, handleProfileSubmit);
const avatarEditPopup = new PopupWithForm(avatarEditSelector);
// handle????

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
  const cardName = inputObj[addCardInputTitleId];
  const cardLink = inputObj[addCardInputLinkId];
  api.addNewCard({ cardElementName: cardName, cardElementLink: cardLink });
  const newCard = creatCard({
    name: cardName,
    link: cardLink,
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

// promise.all

api.getCardAndUserInfo().then(([serverCardList, serverUserInfo]) => {
  // load cards from server
  console.log(serverCardList);
  cardList = new Section(
    {
      items: serverCardList,
      renderer: (item) => {
        const cardItem = creatCard(item);
        cardList.addInitialItem(cardItem);
      },
    },
    cardWrapperSelector
  );
  console.log(cardList);
  // load user bio from server
  const name = serverUserInfo.name;
  const job = serverUserInfo.about;
  userProfile.setUserInfo(name, job);
});

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

// api.updateProfileImage().then((res) => {
//   console.log(res);
// });
// api.renderCards().then((res) => {
//   console.log(res);
// });

// const cardList = new Section(
//   {
//     items: initialCards,
//     renderer: (item) => {
//       const cardItem = creatCard(item);
//       cardList.addInitialItem(cardItem);
//     },
//   },
//   cardWrapperSelector
// );

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
