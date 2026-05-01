import styles from "./Ship.module.css";
import { useShipData } from "../hooks/useShipdata.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Ship() {
  const {
    lat,
    lng,
    services,
    setLat,
    setLng,
    setServices,
    profile,
    offers,
    loading,
    refreshOffers,
    handleCreateOffer,
    handleLogout,
    handlesubmitoffer,
  } = useShipData();

  return (
    <div>
      ship
      {/* PROFILE */}
      <div className={styles.cont1}>
        <div>profile</div>
        <div>UUID : {profile?.uuid}</div>
        <div>Username : {profile?.username}</div>
        <div>IMO : {profile?.imo}</div>
        <div>Vendor username : {profile?.vendor_username}</div>
        <div>type : {profile?.type}</div>
        <div>created at : {profile?.created_at}</div>
      </div>
      {/* OFFERS */}
      <div className={styles.cont1}>
        <div>offers</div>

        {offers?.map((item, index) => (
          <div key={index} className={styles.cont1}>
            <p>Offer ID: {item?.id}</p>
            <p>Services: {item?.serv}</p>
            <p>Status: {item?.status}</p>
            <p>Created at: {item?.created_at}</p>
            <p>Latitude : {item?.lat}</p>
            <p>Longitude : {item?.lng}</p>
          </div>
        ))}

        <button onClick={refreshOffers}>refresh</button>
      </div>
      {/* CREATE OFFER */}
      <div className={styles.cont1}>
        <div>create a offer:</div>

        {/* UUID (readonly display) */}
        <div>
          <label>uuid : </label>
          <input
            className={styles.inputbox}
            value={profile?.uuid || ""}
            readOnly
          />
        </div>

        {/* LAT */}
        <div>
          <label>latitude : </label>
          <input
            className={styles.input}
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </div>

        {/* LNG */}
        <div>
          <label>longitude : </label>
          <input
            className={styles.input}
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </div>

        {/* SERVICES */}
        <div>
          <label>Services : </label>
          <input
            className={styles.input}
            value={services}
            onChange={(e) => setServices(e.target.value)}
          />
        </div>

        <button onClick={handlesubmitoffer}>create</button>
      </div>
      <div className={styles.cont1}>
        <div>update</div>
      </div>
      <div className={styles.cont1}>
        <div>delete</div>
      </div>
      <div className={styles.cont1}>
        <div>Requests : </div>
        <div>
          request are not done yet please wait motherfucker and shreyas if you
          are reading this the curse i typed is not for you please dont take it
          serously
        </div>
      </div>
      <div className={styles.cont1}>
        <div></div>
      </div>
      {/* LOGOUT */}
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
