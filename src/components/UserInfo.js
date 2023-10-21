class UserInfo {
    constructor({ nameSelector, jobSelector }) {
      this._name = nameSelector;
      this._job = jobSelector;
    }
  
    getUserInfo() {
      this._name.textContent = profileTitleInput.value;
      this._job.textContent = profileDescriptionInput.value;
    }
  
    setUserInfo() {
      nameSelector = document.querySelector(".profile__name");
      jobSelector = document.querySelector(".profile__description");
  
      this._name.textContent = nameInput.value;
      this._job.textContent = descriptionInput.value;
    }

}
  export default UserInfo;