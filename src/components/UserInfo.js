export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    //console.log(this._nameElement, this._jobElement);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    //console.log(this.setUserInfo);
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
