import styles from "./EmptyState.module.css";

export default function EmptyState({ icon, title, message, actionLabel, onAction }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconCircle}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      {message && <p className={styles.message}>{message}</p>}
      {actionLabel && onAction && (
        <button className={styles.cta} onClick={onAction}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
