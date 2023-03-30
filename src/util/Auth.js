function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

// "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjQwZGU4YzI0YWE5YmFjODBmZjEzNjQyIn0sImV4cCI6MTY4MTgyMTg1NSwiaWF0IjoxNjc5MjI5ODU1fQ.mM3ZBTYRCirvssIIabZHBvT-_LZqXX59hpqxfNnUvhE",
//         "data": {
//             "_id": "640de8c24aa9bac80ff13642",
//             "name": "Mojerm",
//             "email": "Mojerm@gmail.com",
//             "__v": 0
//         }
function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function isLogin() {
  return getUser() && true;
}

function getToken() {
  return getUser()?.accessToken || "";
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
