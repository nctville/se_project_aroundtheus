class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector); 
    this._job = document.querySelector(jobSelector); 
    this._avatar = document.querySelector(avatarSelector)
  }

  getUserInfo() { 
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._job.textContent = description;
  }

  setAvatarImg({ avatar }) {
    this._avatar = avatar;
}
}
export default UserInfo;