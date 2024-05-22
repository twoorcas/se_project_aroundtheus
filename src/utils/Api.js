export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this._headers = headers;
  }

  getResult(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  }
  // catchErr(err) {
  //   console.error(err);
  // }
  getInitialCards() {
    /* name and link properties, needed foe displaying each card. each card has an ID, stored in the _id property. */
    return fetch(`${this.baseUrl}/cards`, {
      headers: this._headers,
    }).then(this.getResult);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this.getResult);
  }
  updateUserInfo({ editFormNameInput, editFormAboutInput }) {
    fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: editFormNameInput,
        about: editFormAboutInput,
      }),
    }).then(this.getResult);
  }
  addNewCard({ cardElementName, cardElementLink }) {
    fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardElementName,
        link: cardElementLink,
      }),
    }).then(this.getResult);
  }
  deleteCard({ _id }) {
    fetch(`${this.baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.getResult);

    //response is {"message": "This post has been deleted"}
  }
  // toggleLikeBtn(cardId) {
  //   fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
  //     method: "PUT",
  //     headers: this._headers,
  //   })
  //     .then(this.getResult)
  //     .catch((err) => {
  //       console.error(err);
  //     });

  //   fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   })
  //     .then(this.getResult)
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }
  updateProfileImage({ link }) {
    fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
      // In the case that anything other than a link is sent, the server will return an error.
    }).then(this.getResult);
  }
  getCardAndUserInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}
