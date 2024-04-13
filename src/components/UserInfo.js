export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector).textContent;
    this._job = document.querySelector(jobSelector).textContent;
  }

  getUserInfo() {
    const data = { name: this._name, job: this._job };
    return data;
  }
  // returns an object containing information about the user.
  //handy for cases when it's necessary to display the user data in the open form. PopupWithForm editprofile

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  } //takes new user data and adds it to the page.  called after successful submission of PopupWithForm editprofile.
}
//const userInfo=new UserInfo()
