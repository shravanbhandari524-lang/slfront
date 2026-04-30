import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export const storeAccess = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};
