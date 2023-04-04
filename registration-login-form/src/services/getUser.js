import { LIST } from "../utils/routes";
import Cookies from "js-cookie";

export const getUser = () => {
  const token = Cookies.get("_user_token");

  return fetch(LIST, {
    headers: {
      token,
    },
  }).then((response) => {
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  });
};
