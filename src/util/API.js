const API_URL = "https://hakathon2023.onrender.com/api";

function getPosts(offset = "0", limit = "10") {
  let url = `?offset=${offset}&limit=${limit}`;
  return `${API_URL}/post/list${url}`;
}

export const API = {
  signUp: `${API_URL}/auth/signup`,
  login: `${API_URL}/auth/login`,
  getPosts,
  addPost: `${API_URL}/post/add`,
  postDetails: (id) => `${API_URL}/post/details/${id}`,
  updataPost: (id) => `${API_URL}/post/update/${id}`,
  deletePost: (id) => `${API_URL}/post/delete/${id}`,
  sharePost: (id) => `${API_URL}/post/share/${id}`,
};

export default API;
