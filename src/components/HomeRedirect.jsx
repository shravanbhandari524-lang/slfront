import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Rcont } from "../context/Rcontext";
import { getRole } from "../services/decodeToken";

export default function HomeRedirect() {
  const { token, setToken } = useContext(Rcont);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("http://localhost:8080/auth/refresh", {
          method: "POST", // or "POST" depending on your backend
          credentials: "include", // important for cookies (refresh token)
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        if (res.ok) {
          const data = await res.json();

          setToken(data.access);
          const role = getRole(data.access);
          console.log("hhhe");

          if (role === "admin") navigate("/admin");
          else if (role === "ship") navigate("/ship");
          else if (role === "vendor") navigate("/vendor");
          else navigate("/login");
        } else {
          navigate("/login");
        }
      } catch {
        navigate("/login");
      }
    };

    check();
  }, []);

  return <div>Loading...</div>;
}
