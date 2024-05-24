import Card from "../components/Card.js";
import Api from "../utils/Api.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import {
  avatarEditBtn,
  avatarSelector,
  avatarImg,
  avatarLinkInputId,
  deleteCardEl,
  deleteCardSubmitBtn,
  deleteCardSelector,
  avatarEditSelector,
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
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// elements
let cardList;
const imageInfo = new PopupWithImage(picPopupSelector);
const userProfile = new UserInfo({ nameSelector, jobSelector, avatarSelector });
const addCardPopup = new PopupWithForm(
  addCardPopupSelector,
  handleAddCardSubmit
);
const editPopup = new PopupWithForm(editPopupSelector, handleProfileSubmit);
const avatarEditPopup = new PopupWithForm(
  avatarEditSelector,
  handleAvatarSubmit
);
const deleteCardPopup = new PopupWithConfirmation(
  deleteCardSelector,
  handleDeleteSubmit
);

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
  // add initial cards to DOM
  cardList.renderItems(serverCardList);
  // load user bio from server
  const name = serverUserInfo.name;
  const job = serverUserInfo.about;
  const avatar = serverUserInfo.avatar;
  // add user bio to DOM
  userProfile.setUserInfo(name, job);
  userProfile.setAvatar(avatar);
});

// handler

function handleAssignEditInput() {
  const userProfileData = userProfile.getUserInfo();
  editPopup.setInputValues(userProfileData);
}
function handleAvatarSubmit(inputObj) {
  const avatarLink = inputObj[avatarLinkInputId];
  api.updateProfileImage(avatarLink);
  avatarImg.src = avatarLink;
  avatarEditPopup.close();
}

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
  const cardElement = new Card(
    item,
    cardTempSelector,
    handleImageClick,
    handleDeleteClick
  );
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
function handleDeleteClick(card) {
  // open popup
  deleteCardPopup.open();
  // set del action function
  deleteCardSubmitBtn.addEventListener("click", () => {
    deleteCardPopup.setDelAction(handleDeleteSubmit(card));
  });
}
function handleDeleteSubmit(card) {
  card.deleteCardView();
  console.log(card.id);
  api.deleteCard(card.id);
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

// function calls and event listeners
deleteCardSubmitBtn.addEventListener("click", () => {
  deleteCardPopup.close();
});
addCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});
profileEditBtn.addEventListener("click", () => {
  editPopup.open();
  handleAssignEditInput();
});
avatarEditBtn.addEventListener("click", () => {
  avatarEditPopup.open();
});

// setEventListeners
enableValidation(formList);
addCardPopup.setEventListeners();
editPopup.setEventListeners();
imageInfo.setEventListeners();
avatarEditPopup.setEventListeners();
deleteCardPopup.setEventListeners();
