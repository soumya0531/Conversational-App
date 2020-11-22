import axios from "axios";

const API = axios.create({
  baseURL: "https://conversational-app-test.herokuapp.com/",
});

export default API;
