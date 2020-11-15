import axios from "axios";

const API = axios.create({
  baseURL: "https://virtual-market-researcher.herokuapp.com",
});

export default API;
