import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Rcont } from "../context/Rcontext.jsx";
import styles from "./Ship.module.css";
import { decodeToken } from "../services/decodeToken.js";

export default function Admin() {
  const { token, setToken } = useContext(Rcont);
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
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
  const loadOffers = async () => {
    const res = await fetch("http://localhost:8080/offers/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // keep this if you're also using cookies (refresh token)
    });
    const data = await res.json();
    setOffers(data.data);
  };
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
        <div>
          {offers.map((item) => (
            <div key={item.offer_id}>
              <p>Offer ID: {item.offer_id}</p>
              <p>Vessel ID: {item.vessel_id}</p>
              <p>Lat: {item.lat}</p>
              <p>Lng: {item.lng}</p>
              <p>Services : {item.services}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.cont1}>
        <div>requests</div>
      </div>
      <button onClick={handleLogout}>logout</button>
      <button onClick={loadOffers}>show offers</button>
    </div>
  );
}
