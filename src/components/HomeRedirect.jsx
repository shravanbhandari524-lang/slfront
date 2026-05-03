import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rcont } from "../context/Rcontext";
import { getRole } from "../services/decodeToken";
import { refreshAccessToken } from "../api/index.js"; // FIX: use central api

export default function HomeRedirect({ children }) {
  const { setToken } = useContext(Rcont);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        // FIX: no more raw fetch, no duplicate BASE, ngrok header handled centrally
        const data = await refreshAccessToken();

        if (!data?.access) {
          navigate("/login");
          return;
        }

        setToken(data.access);
        const role = getRole(data.access);

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "ship") {
          navigate("/ship");
        } else if (role === "vendor") {
          navigate("/vendor");
        } else {
          navigate("/login");
        }
      } catch (err) {
        // refreshAccessToken throws on non-ok (401 = no cookie = not logged in)
        console.error(err.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    check();
  }, [navigate, setToken]);

  if (loading) return <div>Loading...</div>;

  return children;
}
