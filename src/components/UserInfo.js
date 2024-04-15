export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._jobEl = document.querySelector(jobSelector);
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
}
