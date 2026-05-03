import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rcont } from "../context/Rcontext";
import { getRole } from "../services/decodeToken";
import { refreshAccessToken } from "../api/index.js";

export default function ProtectRoutes({ children, role }) {
  const { token, setToken } = useContext(Rcont);
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      let activeToken = token;

      // if token not in context (e.g. page refresh wiped it), try cookie
      if (!activeToken) {
        try {
          const data = await refreshAccessToken();
          setToken(data.access);
          activeToken = data.access;
        } catch {
          navigate("/login");
          return;
        }
      }

      // check role matches the route
      const userRole = getRole(activeToken);
      if (userRole !== role) {
        navigate("/login");
        return;
      }

      setChecking(false);
    };

    verify();
  }, []);

  if (checking) return <div>Loading...</div>;

  return children;
}
