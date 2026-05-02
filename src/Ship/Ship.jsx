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
    requests,
    assignments,
    refreshOffers,
    handleCreateOffer,
    handleLogout,
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
          <label>ship uuid : </label>
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
            type="number"
            className={styles.input}
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </div>

        {/* LNG */}
        <div>
          <label>longitude : </label>
          <input
            type="number"
            className={styles.input}
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </div>

        {/* SERVICES */}
        <div>
          <label>Services : </label>
          <input
            type="text"
            className={styles.input}
            value={services}
            onChange={(e) => setServices(e.target.value)}
            required
          />
        </div>

        <button onClick={handleCreateOffer}>create</button>
      </div>
      <div className={styles.cont1}>
        <div>update</div>
        <div>
          <label>Enter offer uuid : </label>
          <input />
        </div>
        <div>
          <label>latitude : </label>
          <input />
        </div>
        <div>
          <label>Longitude : </label>
          <input />
        </div>
        <div>
          <label>Services : </label>
          <input />
        </div>
        <button>update</button>
      </div>
      <div className={styles.cont1}>
        <div>delete</div>
        <div>
          <label>enter offer uuid :</label>
          <input />
        </div>
        <div>
          <label>confirm to delte : </label>
          <input type="checkbox" />
        </div>
        <button>delete</button>
      </div>
      <div className={styles.cont1}>
        <div>Requests : </div>
        <div className={styles.cont1}>
          <div>all request by this ships :</div>
          <div>
            {requests?.map((item, index) => (
              <div key={index} className={styles.cont1}>
                <p>Offer ID: {item?.id}</p>
                <p>Services: {item?.serv}</p>
                <p>Status: {item?.status}</p>
                <p>Created at: {item?.created_at}</p>
                <p>Latitude : {item?.lat}</p>
                <p>Longitude : {item?.lng}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.cont1}>
          <div>create</div>
          <div>
            <label>ship uuid : </label>
            <input
              className={styles.inputbox}
              value={profile?.uuid || ""}
              readOnly
            />
          </div>
          <div>
            <label>latitude : </label>
            <input />
          </div>
          <div>
            <label>longitude : </label>
            <input />
          </div>
          <div>
            <label>services : </label>
            <input />
          </div>
        </div>
        <div className={styles.cont1}>
          <div>update</div>
          <div>
            <label>request uuid : </label>
            <input />
          </div>
          <div>
            <label>latitude : </label>
            <input />
          </div>
          <div>
            <label>longitude : </label>
            <input />
          </div>
          <div>
            <label>services : </label>
            <input />
          </div>
        </div>
        <div className={styles.cont1}>
          <div>delete</div>
          <div>
            <label>enter request uuid :</label>
            <input />
          </div>
          <div>
            <label>confirm to delte : </label>
            <input type="checkbox" />
          </div>
          <button>delete</button>
        </div>
      </div>
      <div className={styles.cont1}>
        <div>assignements : </div>
        <div className={styles.cont1}>
          {" "}
          {assignments?.map((item, index) => (
            <div key={index} className={styles.cont1}>
              <p>Offer ID: {item?.id}</p>
              <p>request vessel id : {item?.request_vessel_id}</p>
              <p>Services: {item?.serv}</p>
              <p>Status: {item?.status}</p>
              <p>assigned time : {item?.assigned_time}</p>
              <p>completed time : {item?.completed_time}</p>
              <p>Latitude : {item?.lat}</p>
              <p>Longitude : {item?.lng}</p>
            </div>
          ))}
        </div>
        <div className={styles.cont1}>
          <div>current assignement</div>
          <div>
            {" "}
            <p>Offer ID: </p>
            <p>request vessel id : </p>
            <p>Services: </p>
            <p>Status: </p>
            <p>assigned time : </p>
            <p>completed time : </p>
            <p>Latitude : </p>
            <p>Longitude : </p>
          </div>
          <div>
            <label>choose staus of this assignment : </label>
            <input type="checkbox" />
            <input type="checkbox" />
            <button>submit</button>
          </div>
        </div>
      </div>
      {/* LOGOUT */}
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
