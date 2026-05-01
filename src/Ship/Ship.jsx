import { useContext, useEffect } from "react";
import { Rcont } from "../context/Rcontext.jsx";

import styles from "./Ship.module.css";

import { useAuthRefresh } from "../hooks/useAuthRefresh.js";
import { useProfile } from "../hooks/useProfile.js";
import { useOffers } from "../hooks/useOffers.js";
import { refreshOffers } from "../services/refreshOffers.js";

export default function Ship() {
  const { token } = useContext(Rcont);

  const { decoded, refreshToken } = useAuthRefresh();

  const { profile, loadProfile } = useProfile(token, refreshToken);

  const { offers, loadOffers, setOffers } = useOffers(token, refreshToken);

  // init
  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  // profile
  useEffect(() => {
    if (!decoded) return;

    loadProfile(decoded);
  }, [decoded, loadProfile]);

  // offers
  useEffect(() => {
    if (!profile?.uuid) return;

    loadOffers(decoded);
  }, [profile, decoded, loadOffers]);
  const callRefresh = async () => {
    await refreshOffers(token, decoded, setOffers);
  };
  return (
    <div>
      ship
      <div className={styles.cont1}>
        <div>profile</div>

        <div>UUID : {profile?.uuid}</div>
        <div>Username : {profile?.username}</div>
        <div>IMO : {profile?.imo}</div>
        <div>Vendor username : {profile?.vendor_username}</div>
        <div>type : {profile?.type}</div>
        <div>created at : {profile?.created_at}</div>
      </div>
      <div className={styles.cont1}>
        <div>offers</div>

        {offers.map((item, index) => (
          <div key={index} className={styles.cont1}>
            <p>Offer ID: {item?.id}</p>
            <p>Services: {item?.serv}</p>
            <p>Status: {item?.status}</p>
            <p>Created at: {item?.created_at}</p>
          </div>
        ))}
        <button onClick={callRefresh}>refresh</button>
      </div>
    </div>
  );
}
