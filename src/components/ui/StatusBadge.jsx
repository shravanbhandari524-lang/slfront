import styles from "./StatusBadge.module.css";

export default function StatusBadge({ status }) {
  const s = (status || "").toLowerCase();
  let variant = styles.inactive;
  if (s === "active" || s === "completed") variant = styles.active;
  else if (s === "pending" || s === "assigned") variant = styles.pending;

  return (
    <span className={`${styles.badge} ${variant}`}>
      {status || "—"}
    </span>
  );
}
