export default class UserInfo {
  constructor({ profileName, profileText, profileAvatar }) {
    this._name = profileName;
    this._text = profileText;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      text: this._text.textContent,
    };
    return userInfo;
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._text.textContent = userInfo.about;
  }
  setAvatarInfo(linkAvatar) {
    this._profileAvatar.style.backgroundImage = `url("${linkAvatar.avatar}")`;
  }
}