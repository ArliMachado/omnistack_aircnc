import axios from "axios";

const api = axios.create({
  baseURL: "http://10.168.71.113:3333"
});

export default api;
