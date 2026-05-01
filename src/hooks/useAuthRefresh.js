// hooks/useAuthRefresh.js

import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rcont } from "../context/Rcontext.jsx";
import { decodeToken } from "../services/decodeToken.js";
import { refreshAccessToken } from "../services/authService.js";

export function useAuthRefresh() {
  const navigate = useNavigate();
  const { setToken } = useContext(Rcont);

  const [decoded, setDecoded] = useState(null);

  const refreshToken = useCallback(async () => {
    try {
      const data = await refreshAccessToken();

      const accessToken = data.access;

      setToken(accessToken);

      const decodedData = decodeToken(accessToken);

      setDecoded(decodedData);

      return decodedData;
    } catch (err) {
      navigate("/");
      return null;
    }
  }, [navigate, setToken]);

  return {
    decoded,
    refreshToken,
  };
}
