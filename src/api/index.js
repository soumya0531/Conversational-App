import axios from "axios";

const API = axios.create({
  baseURL: "www.google.com",
});

export default API;
