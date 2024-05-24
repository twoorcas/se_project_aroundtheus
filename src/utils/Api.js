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
  deleteCard(_id) {
    return fetch(`${this.baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this.getResult(res));

    //response is {"message": "This post has been deleted"}
  }
  toggleLikeBtn(card) {
    if (!card.isLiked) {
      return fetch(`${this.baseUrl}/cards/${card._id}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this.getResult);
    }
    return fetch(`${this.baseUrl}/cards/${card._id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.getResult);
  }
  updateProfileImage(link) {
    fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this.getResult);
  }
  getCardAndUserInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}
