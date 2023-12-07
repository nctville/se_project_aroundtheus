class UserInfo {
  constructor({ nameSelector, jobSelector, avatar }) {
    this._name = document.querySelector(nameSelector); 
    this._job = document.querySelector(jobSelector); 
    
    this._avatar = avatar
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
    this._avatar.src = avatar;
}
}
export default UserInfo;