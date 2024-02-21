function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}
function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, config) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, config);
  }
  hideInputError(formEl, inputEl, config);
}
function hasInvalidInput(inputEls) {
  return inputEls.some((inputEl) => {
    return !inputEl.validity.valid;
  });
}
function toggleButtonstate(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}
function setEventListeners(formEl, { inactiveButtonClass }) {
  const inputEls = [...formEl.querySelectorAll(config.inputSelector)];
  const submitButton = formEl.querySelector(config.submitButtonSelector);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonstate(inputEls, submitButton, { inactiveButtonClass });
    });
  });
}
function enableValidation(config) {
  const formEls = [...document.querySelectorAll(config.formSelector)];

  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, config);
  });
}
function closeModal(modalEl) {
  modalEl.classList.remove("modal_opened");
}
function clickOverlay() {
  const modalEls = [...document.querySelectorAll(".modal")];
  modalEls.forEach((modalEl) => {
    modalEl.addEventListener("click", (e) => {
      if (e.target === modalEl) {
        closeModal(modalEl);
      }
    });
  });
}

function pressEsc() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modalEls.forEach((modalEl) => {
        closeModal(modalEl);
      });
    }
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
enableValidation(config);
clickOverlay();
pressEsc();
