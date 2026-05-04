import MapView from "../../components/MapView.jsx";
import styles from "./AssignmentsPage.module.css";

export default function MapPage() {
  // TODO: Replace demoPoints with real backend/API data here
  // You can modify points from here: src/Ship/pages/MapPage.jsx
  const demoPoints = [
    { id: 1, name: "Ship A", lat: 12.9716, lng: 77.5946 },
    { id: 2, name: "Ship B", lat: 13.0827, lng: 80.2707 },
    { id: 3, name: "Ship C", lat: 11.9416, lng: 79.8083 }
  ];

  return (
    <div className={styles.main}>
      <div className={styles.fadeIn} style={{ width: "100%" }}>
        <h2 className={styles.sectionTitle}>Vessel Tracking Map</h2>
        <div style={{ width: "100%", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border-color)", marginBottom: "2rem" }}>
          <MapView points={demoPoints} />
        </div>
      </div>
    </div>
  );
}
