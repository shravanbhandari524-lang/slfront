import { useState, useRef, useEffect } from "react";
import styles from "./DashboardLayout.module.css";

const TABS = [
  { key: "profile", label: "Profile", icon: "👤" },
  { key: "offers", label: "Offers", icon: "📦" },
  { key: "requests", label: "Requests", icon: "📋" },
  { key: "assignments", label: "Assignments", icon: "🗂️" },
];

export default function DashboardLayout({ activeTab, onTabChange, onLogout, children }) {
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      const parent = el.parentElement;
      const parentRect = parent.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicator({
        left: elRect.left - parentRect.left,
        width: elRect.width,
      });
    }
  }, [activeTab]);

  return (
    <div className={styles.layout}>
      {/* Top Nav */}
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <div className={styles.navIcon}>⚓</div>
          <span className={styles.navTitle}>SEALINE</span>
        </div>
        <div className={styles.navRight}>
          <span className={styles.navRole}>Ship</span>
          <button className={styles.logoutBtn} onClick={onLogout}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign out
          </button>
        </div>
      </nav>

      {/* Page Header + Tabs */}
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Ship Dashboard</h1>
        <p className={styles.pageSubtitle}>Manage your vessel's offers, requests and assignments</p>

        <div className={styles.tabBar}>
          <div className={styles.tabIndicator} style={{ left: indicator.left, width: indicator.width }} />
          {TABS.map((tab) => (
            <button
              key={tab.key}
              ref={(el) => (tabRefs.current[tab.key] = el)}
              className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ""}`}
              onClick={() => onTabChange(tab.key)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Content Area */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
