import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import {
  settings,
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
  ESC_KEYCODE,
  initialCards,
  cardWrapperSelector,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

// Needed
function handleProfileSubmit(e) {
  e.preventDefault();
  UserProfile.setUserInfo({
    name: editPopupInputObj[editInputTitleId],
    job: editPopupInputObj[editInputDescriptionId],
  });
  editPopup.close();
}

// Needed
function handleAddCardSubmit() {
  addCardPopup.close();
  formValidators[addCardFormId].disableSubmitButton();
  e.target.reset();
}

// Needed
function handleImageClick({ name, link }) {
  const imageInfo = new PopupWithImage({ name, link });
  imageInfo.open();
  imageInfo.setEventListeners();
}

/*form validation*/
const formValidators = {};
const enableValidation = (formList) => {
  formList.forEach((form) => {
    const formValidator = new FormValidator(settings, form);
    formValidator.enableValidation();
    formValidators[form.getAttribute("id")] = formValidator;

    return formValidators;
  });
};

//New
const UserProfile = new UserInfo({ nameSelector, jobSelector });
const addCardPopup = new PopupWithForm(
  addCardPopupSelector,
  handleAddCardSubmit
);
const editPopup = new PopupWithForm(editPopupSelector, handleProfileSubmit);
const editPopupInputObj = editPopup._getInputValues;
const addCardPopupInputObj = addCardPopup._getInputValues;
const newCard = new Card(
  {
    name: addCardPopupInputObj[addCardInputTitleId],
    link: addCardPopupInputObj[addCardInputLinkId],
  },
  cardTempSelector,
  handleImageClick
);

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = new Card(item, cardTempSelector, handleImageClick);
      const cardItem = cardElement.getView();
      const cardWrapper = document.querySelector(cardWrapperSelector);
      cardWrapper.append(cardItem);
    },
  },
  cardWrapperSelector
);
addCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});
profileEditBtn.addEventListener("click", () => {
  editPopup.open();
});
//Needed
cardList.renderItems(initialCards);
cardList.addItem(newCard);
enableValidation(formList);
addCardPopup.setEventListeners();
editPopup.setEventListeners();

//render cards on page load done.
//An instance of the Section class is created for each container in which elements are rendered.
