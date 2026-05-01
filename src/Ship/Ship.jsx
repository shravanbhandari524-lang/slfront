import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Rcont } from "../context/Rcontext.jsx";
import styles from "./Ship.module.css";
import { decodeToken } from "../services/decodeToken.js";

export default function Admin() {
  const navigate = useNavigate();

  const { token, setToken } = useContext(Rcont);
  const [profile, setProfile] = useState({
    uuid: null,
    username: null,
    imo: null,
    type: null,
    created_at: null,
    vendor_username: null,
  });
  const [decoded, setDecoded] = useState(null); // ✅ stays null until loaded

  const loadProfile = async () => {
    try {
      if (!decoded) {
        await setAccesstoken();
        return;
      }
      const profile1 = JSON.parse(localStorage.getItem("profile"));

      if (profile1) {
        const res = await fetch(
          "http://localhost:8080/ships/me/" + decoded.uuid,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!res.ok) {
          throw { statusCode: res.status };
        } else {
          const { data } = await res.json();
          const value = {
            uuid: decoded.uuid,
            username: decoded.username,
            type: decoded.role,
            imo: data[0].imo,
            created_at: decoded.created_at,
            vendor_username: data[0].vendor_username,
          };
          localStorage.setItem("profile", JSON.stringify(value));
          setProfile(value);
        }
      } else {
        console.log("Cache");

        setProfile(profile1);
      }
    } catch (err) {
      if (err.statusCode == 401) {
        setAccesstoken();
      }
    }
  };

  const setAccesstoken = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/refresh", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        throw { statusCode: res.status };
      } else {
        const data = await res.json();
        const accessToken = data.access;
        setToken(accessToken);
        const x = decodeToken(accessToken);
        setDecoded(x);
      }
    } catch (err) {
      if (err.statusCode == 401) navigate("/");
    }
  };
  useEffect(() => {
    setAccesstoken();
  }, []);

  useEffect(() => {
    loadProfile();
  }, [decoded]);
  return (
    <div>
      ship
      <div className={styles.cont1}>
        <div>profile</div>
        <div>UUID : {profile?.uuid}</div> {/* ✅ optional chaining */}
        <div>Username : {profile?.username}</div>
        <div>IMO : {profile?.imo}</div>
        <div>Vendor username : {profile?.vendor_username}</div>
        <div>type : {profile?.type}</div>
        <div>created at : {profile?.created_at}</div>
      </div>
      <div className={styles.cont1}>
        <div>offers</div>
        <div>
          {/* {offers.map((item) => (
            <div key={item.offer_id}>
              <p>Offer ID: {item.offer_id}</p>
              <p>Vessel ID: {item.vessel_id}</p>
              <p>Lat: {item.lat}</p>
              <p>Lng: {item.lng}</p>
              <p>Services: {item.services}</p>
            </div>
          ))} */}
        </div>
      </div>
      <div className={styles.cont1}>
        <div>requests</div>
      </div>
    </div>
  );
}
