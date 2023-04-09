function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function isLogin() {
  return getUser() && true;
}

function getToken() {
  return `Bearer ${getUser()?.accessToken || ""}`;
}
function logOut() {
  localStorage.removeItem("user");
}

export const Auth = {
  getUser,
  setUser,
  isLogin,
  getToken,
  logOut,
};

export default Auth;
