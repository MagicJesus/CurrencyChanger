import axios from "axios";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const api = axios.create({
  baseURL: "http://api.nbp.pl/api/exchangerates/rates/a",
  httpAgent: agent,
});
