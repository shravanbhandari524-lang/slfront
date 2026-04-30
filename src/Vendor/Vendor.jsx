import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Rcont } from "../context/Rcontext.jsx";
export default function Admin() {
  const { setToken } = useContext(Rcont);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include", // ← needed to send the cookie so backend can clear it
    });
    setToken("");
    navigate("/login");
  };
  return (
    <div>
      vendor<button onClick={handleLogout}>logout</button>
    </div>
  );
}
