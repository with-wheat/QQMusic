class locaoCache {
  setToken(token: string) {
    window.localStorage.setItem("cookie", token);
  }
  getToken() {
    return window.localStorage.getItem("cookie");
  }
  deleteToken() {
    window.localStorage.removeItem("cookie");
  }
}
export default new locaoCache();
