import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Rcont } from "../context/Rcontext.jsx";
import styles from "./Ship.module.css";
import { decodeToken } from "../services/decodeToken.js";

export default function Admin() {
  const { token, setToken } = useContext(Rcont);
  const navigate = useNavigate();

  const [decoded, setDecoded] = useState(null);

  const handleLogout = async () => {
    await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setToken("");
    navigate("/login");
  };

  useEffect(() => {
    const data = decodeToken(token);
    console.log(data);
    if (!data) {
      navigate("/login");
    } else {
      setDecoded(data);
    }
  }, [token]);

  if (!decoded) return null; // or loading / redirect

  return (
    <div>
      ship
      <div className={styles.cont1}>
        <div>profile</div>
        <div>UUID : {decoded.uuid}</div>
        <div>Username : {decoded.username}</div>
        <div>type : {decoded.role}</div>
        <div>created at : {decoded.created_at}</div>
      </div>
      <div className={styles.cont1}>
        <div>offers</div>
      </div>
      <div className={styles.cont1}>
        <div>requests</div>
      </div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
