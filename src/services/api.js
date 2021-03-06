import axios from "axios";

export const api = axios.create({
  baseURL: "http://api.nbp.pl/api/exchangerates/rates/a",
});
