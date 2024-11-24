export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    console.log("Updated avatar URL:", this._avatarElement.src);
    //console.log(this._nameElement, this._jobElement);
  }

  getUserInfo() {
    console.log("Name:", this._nameElement.textContent);
    console.log("Job:", this._jobElement.textContent);
    console.log("Avatar SRC:", this._avatarElement.src);
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, job, avatar }) {
    //console.log(this.setUserInfo);
    console.log("Received data in setUserInfo:", { name, job, avatar });
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this.setUserAvatar(avatar);
  }

  setUserAvatar(avatarUrl) {
    console.log("Setting avatar to:", avatarUrl);
    this._avatarElement.src = avatarUrl;
    console.log("Current avatar src:", this._avatarElement.src);
  }
}
