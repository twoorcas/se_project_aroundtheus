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
  saveBtns,
  avatarFormId,
  avatarSelector,
  avatarImg,
  avatarLinkInputId,
  profileEditFormId,
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
const deleteCardPopup = new PopupWithConfirmation(deleteCardSelector);
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

// api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "62fbc1de-42d6-41b7-8bb5-5b0736932e96",
    "Content-Type": "application/json",
  },
});

// promise.all
api
  .getCardAndUserInfo()
  .then(([serverCardList, serverUserInfo]) => {
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
    //likeBtn active if isLiked=true

    // load user bio from server
    const name = serverUserInfo.name;
    const job = serverUserInfo.about;
    const avatar = serverUserInfo.avatar;
    // add user bio to DOM
    userProfile.setUserInfo(name, job);
    userProfile.setAvatar(avatar);
  })
  .catch((err) => {
    console.error(err);
  });
// handler

function handleAssignEditInput() {
  const userProfileData = userProfile.getUserInfo();
  editPopup.setInputValues(userProfileData);
}

function handleAvatarSubmit(inputObj) {
  avatarEditPopup.showUploadingState();
  const avatarLink = inputObj[avatarLinkInputId];
  api
    .updateProfileImage(avatarLink)
    .then((res) => {
      avatarEditPopup.showUploaded();
      console.log(res);
      userProfile.setAvatar(res.avatar);
      avatarEditPopup.close();
      formValidators[avatarFormId].disableSubmitButton();
      avatarEditPopup.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarEditPopup.showUploaded();
    });
}

function handleProfileSubmit(inputObj) {
  const nameEl = inputObj[editInputTitleId];
  const jobEl = inputObj[editInputDescriptionId];
  editPopup.showUploadingState();
  api
    .updateUserInfo({
      editFormNameInput: nameEl,
      editFormAboutInput: jobEl,
    })
    .then((res) => {
      editPopup.showUploaded();
      userProfile.setUserInfo(res.name, res.about); // get userinfo from server and apply to profile
      editPopup.close();
      formValidators[profileEditFormId].disableSubmitButton();
      editPopup.reset();
    })
    .catch((err) => {
      console.error(err);
    });
}
function creatCard(item) {
  const cardElement = new Card(
    item,
    cardTempSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  const cardItem = cardElement.getView();
  return cardItem;
}

function handleAddCardSubmit(inputObj) {
  const cardName = inputObj[addCardInputTitleId];
  const cardLink = inputObj[addCardInputLinkId];
  addCardPopup.showUploadingState();
  api
    .addNewCard({ cardElementName: cardName, cardElementLink: cardLink })
    .then((card) => {
      addCardPopup.showUploaded();
      const newCard = creatCard(card);
      cardList.addItem(newCard);
      formValidators[addCardFormId].disableSubmitButton();
      addCardPopup.close();
      addCardPopup.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardPopup.showToUpload;
    });
}

function handleImageClick({ name, link }) {
  imageInfo.open({ name, link });
}
function handleLikeClick(card) {
  const actionPromise = card.isLiked()
    ? api.unlikeCard(card)
    : api.likeCard(card);
  actionPromise
    .then((updatedCard) => {
      card.setIsLiked(updatedCard.isLiked);
    })
    .catch((err) => {
      console.error(err);
    });
}
function handleDeleteClick(card) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.showLoading();
    api
      .deleteCard(card.id)
      .then((res) => {
        deleteCardPopup.close();
        card.deleteCard();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        deleteCardPopup.showDeleted();
      });
  });
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
