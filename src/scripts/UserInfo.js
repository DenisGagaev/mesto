export default class UserInfo {
    constructor({ profileName, profileText }) {
      this._name = profileName;
      this._text = profileText;
    }
  
    getUserInfo() {
      const userInfo = {
        name: this._name.textContent,
        text: this._text.textContent,
      };
      return userInfo;
    }

  
    setUserInfo(userInfo) {
      this._name.textContent = userInfo.profileName.trim();
      this._text.textContent = userInfo.profileText.trim();
    }
  }