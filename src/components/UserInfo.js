export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._jobEl = document.querySelector(jobSelector);
  }
  getUserInfo() {
    const data = { name: this._nameEl.innerText, job: this._jobEl.innerText };
    return data;
  }

  setUserInfo(name, job) {
    this._nameEl.innerText = name;
    this._jobEl.innerText = job;
  }
}
