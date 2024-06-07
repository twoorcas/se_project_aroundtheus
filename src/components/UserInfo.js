export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._jobEl = document.querySelector(jobSelector);
    this._avatarEl = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    const data = {
      title: this._nameEl.innerText,
      description: this._jobEl.innerText,
    };
    return data;
  }

  setUserInfo(name, job) {
    this._nameEl.innerText = name;
    this._jobEl.innerText = job;
  }
  setAvatar(link) {
    this._avatarEl.src = link;
  }
}
