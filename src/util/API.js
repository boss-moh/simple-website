import Auth from "./Auth";

const API_URL = "https://hakathon2023.onrender.com/api";

function getOptionsWithOutTaken(method = "get", data = "", type = "") {
  const options = {
    method,
  };
  if (data) {
    options.body = data;
  }
  if (type) {
    options.headers = {
      "Content-Type": type,
    };
  }
  return options;
}

function getOptionsWithTaken(method = "get", data = "", type = "") {
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  };
  if (data) {
    options.body = data;
  }
  if (type) {
    options.headers["Content-Type"] = type;
  }
  return options;
}

function signUpRequest(data) {
  return getOptionsWithOutTaken("POST", data, "application/json");
}
function loginRequest(data) {
  return getOptionsWithOutTaken("POST", data, "application/json");
}
function PostsRequest() {
  return getOptionsWithTaken("Get");
}

function getPosts(offset = "0", limit = "10") {
  let url = `?offset=${offset}&limit=${limit}`;
  return `${API_URL}/post/list${url}`;
}

export const API = {
  signUp: () => `${API_URL}/auth/signup`,
  login: () => `${API_URL}/auth/login`,
  getPosts,
  PostsRequest,
  getOptionsWithOutTaken,
  getOptionsWithTaken,
  signUpRequest,
  loginRequest,
};

export default API;
