import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import {
  settings,
  formValidators,
  picPopupSelector,
  editInputDescriptionEl,
  editInputTitleEl,
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
  const userProfileData = UserProfile.getUserInfo();
  editInputTitleEl.value = userProfileData.name;
  editInputDescriptionEl.value = userProfileData.job;
}

function handleProfileSubmit(inputObj) {
  UserProfile.setUserInfo(
    inputObj[editInputTitleId],
    inputObj[editInputDescriptionId]
  );
  editPopup.close();
}

function handleAddCardSubmit(inputObj) {
  addCardPopup.close();
  const newCard = new Card(
    {
      name: inputObj[addCardInputTitleId],
      link: inputObj[addCardInputLinkId],
    },
    cardTempSelector,
    handleImageClick
  );
  const creatCard = newCard.getView();
  cardList.addItem(creatCard);
  formValidators[addCardFormId].disableSubmitButton();
  addCardPopup.reset();
}

function handleImageClick({ name, link }) {
  const imageInfo = new PopupWithImage(picPopupSelector, { name, link });
  imageInfo.open();
  imageInfo.setEventListeners();
}

/*form validation*/
const enableValidation = (formList) => {
  formList.forEach((form) => {
    const formValidator = new FormValidator(settings, form);
    formValidator.enableValidation();
    formValidators[form.getAttribute("id")] = formValidator;

    return formValidators;
  });
};

//elements
const UserProfile = new UserInfo({ nameSelector, jobSelector });
const addCardPopup = new PopupWithForm(
  addCardPopupSelector,
  handleAddCardSubmit
);
const editPopup = new PopupWithForm(editPopupSelector, handleProfileSubmit);
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = new Card(item, cardTempSelector, handleImageClick);
      const cardItem = cardElement.getView();
      cardList.addInitialItem(cardItem);
    },
  },
  cardWrapperSelector
);

//function calls and event listeners
addCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});
profileEditBtn.addEventListener("click", () => {
  editPopup.open();
  handleAssignEditInput();
});

cardList.renderItems(initialCards);
enableValidation(formList);
addCardPopup.setEventListeners();
editPopup.setEventListeners();
