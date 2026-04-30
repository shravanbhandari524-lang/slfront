import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const getRole = (token) => {
  try {
    const decode = jwtDecode(token);
    console.log(decode);
    return decode.role;
  } catch (err) {
    console.log(err.message);
    return 0;
  }
};
