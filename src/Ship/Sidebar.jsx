import styles from "./Sidebar.module.css";

export default function Sidebar({ items, activeKey, onSelect }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarInner}>
        <nav className={styles.nav}>
          {items.map((item) => {
            const isActive = activeKey === item.key;
            return (
              <button
                key={item.key}
                className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                onClick={() => onSelect(item.key)}
              >
                {isActive && <div className={styles.activeGlow} />}
                <div className={`${styles.iconWrap} ${isActive ? styles.iconWrapActive : ""}`}>
                  <span className={styles.icon}>{item.icon}</span>
                </div>
                <span className={styles.label}>{item.label}</span>
                {isActive && <div className={styles.activeBar} />}
                {isActive && (
                  <svg className={styles.chevron} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
