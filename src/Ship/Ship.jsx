import styles from "./Ship.module.css";
import { useShipData } from "../hooks/useShipdata.js";

export default function Ship() {
  const { profile, offers, loading, refreshOffers } = useShipData();

  if (loading) return <div>Loading...</div>;

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
        <button onClick={refreshOffers}>refresh</button>
      </div>
    </div>
  );
}
