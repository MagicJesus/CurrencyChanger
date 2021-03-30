import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.nbp.pl/api/exchangerates/rates/a",
});
