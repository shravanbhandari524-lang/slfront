import styles from "./MapPicker.module.css";

export default function MapPicker({ lat, lng, onLatChange, onLngChange }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mapPreview}>
        <div className={styles.mapGrid}>
          <div className={styles.gridLineH} style={{ top: '25%' }} />
          <div className={styles.gridLineH} style={{ top: '50%' }} />
          <div className={styles.gridLineH} style={{ top: '75%' }} />
          <div className={styles.gridLineV} style={{ left: '25%' }} />
          <div className={styles.gridLineV} style={{ left: '50%' }} />
          <div className={styles.gridLineV} style={{ left: '75%' }} />
        </div>
        <div className={styles.pin}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="rgba(59,130,246,0.3)" stroke="var(--accent-primary)" strokeWidth="1.5"/>
            <circle cx="12" cy="9" r="2.5" fill="var(--accent-primary)"/>
          </svg>
        </div>
        {lat && lng ? (
          <div className={styles.coordsOverlay}>{Number(lat).toFixed(4)}°, {Number(lng).toFixed(4)}°</div>
        ) : (
          <div className={styles.hintOverlay}>Enter coordinates below</div>
        )}
      </div>
      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Latitude</label>
          <input type="number" step="any" className={styles.input} placeholder="e.g. 48.8566" value={lat} onChange={(e) => onLatChange(e.target.value)} />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Longitude</label>
          <input type="number" step="any" className={styles.input} placeholder="e.g. 2.3522" value={lng} onChange={(e) => onLngChange(e.target.value)} />
        </div>
      </div>
    </div>
  );
}
