import styles from "./Sidebar.module.css";

export default function Sidebar({ items, activeKey, onSelect }) {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {items.map((item) => (
          <button
            key={item.key}
            className={`${styles.item} ${activeKey === item.key ? styles.itemActive : ""}`}
            onClick={() => onSelect(item.key)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
            {activeKey === item.key && <div className={styles.activeBar} />}
          </button>
        ))}
      </nav>
    </aside>
  );
}
