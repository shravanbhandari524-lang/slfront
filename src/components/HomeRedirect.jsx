import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rcont } from "../context/Rcontext";
import { getRole } from "../services/decodeToken";

const BASE =
  "https://d6cf-2401-4900-892f-96e2-66f8-11f5-3641-5022.ngrok-free.app";

export default function HomeRedirect({ children }) {
  const { setToken } = useContext(Rcont);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`${BASE}/auth/refresh`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true", // ← this is the fix
          },
        });

        if (!res.ok) {
          navigate("/login");
          return;
        }

        const data = await res.json();

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
        console.error(err);

        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    check();
  }, [navigate, setToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
}
