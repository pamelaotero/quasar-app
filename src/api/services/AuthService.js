import axios from "axios";

export const instance = axios.create({
  baseURL: "https://sys-dev.searchandstay.com/api/admin/",
  headers: {
    Authorization:
      "Bearer " +
      "40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8",
  },
});
