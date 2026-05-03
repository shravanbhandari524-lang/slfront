import { useState, useRef, useEffect } from "react";
import styles from "./DashboardLayout.module.css";

const TABS = [
  { key: "profile",     label: "Profile",     icon: "👤" },
  { key: "offers",      label: "Offers",      icon: "📦" },
  { key: "requests",    label: "Requests",    icon: "📋" },
  { key: "assignments", label: "Assignments", icon: "🗂️" },
];

export default function DashboardLayout({ activeTab, onTabChange, onLogout, children }) {
  const tabRefs  = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      const parent = el.closest(`.${styles.tabList}`);
      if (!parent) return;
      const pr = parent.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      setIndicator({ left: er.left - pr.left, width: er.width });
    }
  }, [activeTab]);

  const activeTabData = TABS.find(t => t.key === activeTab);

  return (
    <div className={styles.layout}>
      {/* Ambient background orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.orb3} aria-hidden="true" />

      {/* ── TOP NAV ─────────────────────────────── */}
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <div className={styles.navIconWrap}>
            <div className={styles.navIcon}>⚓</div>
          </div>
          <div className={styles.navBrandText}>
            <span className={styles.navTitle}>SEALINE</span>
            <span className={styles.navSubtitle}>Maritime Operations</span>
          </div>
        </div>

        {/* Desktop ghost tabs — mirror the subNav */}
        <div className={styles.navCenter} aria-hidden="true">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`${styles.navTab} ${activeTab === tab.key ? styles.navTabActive : ""}`}
              onClick={() => onTabChange(tab.key)}
              tabIndex={-1}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.navRight}>
          <div className={styles.navStatus}>
            <span className={styles.navStatusDot} />
            <span className={styles.navStatusLabel}>Online</span>
          </div>
          <div className={styles.navRolePill}>
            <span>🚢</span>
            <span className={styles.navRoleLabel}>Ship</span>
          </div>
          <button className={styles.logoutBtn} onClick={onLogout}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign out
          </button>
        </div>
      </nav>

      {/* ── STICKY SUB-NAV (tabs) ────────────────── */}
      <div className={styles.subNav}>
        <div className={styles.subNavInner}>
          <div className={styles.tabList}>
            {/* sliding underline indicator */}
            <span
              className={styles.tabIndicator}
              style={{ left: indicator.left, width: indicator.width }}
              aria-hidden="true"
            />
            {TABS.map(tab => (
              <button
                key={tab.key}
                ref={el => (tabRefs.current[tab.key] = el)}
                className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ""}`}
                onClick={() => onTabChange(tab.key)}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                <span className={styles.tabLabel}>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PAGE TITLE BAR ──────────────────────── */}
      <div className={styles.titleBar}>
        <div className={styles.titleBarInner}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbRoot}>Ship Dashboard</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            <span className={styles.breadcrumbCurrent}>{activeTabData?.label}</span>
          </div>
          <h1 className={styles.pageTitle}>
            <span className={styles.pageTitleIcon}>{activeTabData?.icon}</span>
            {activeTabData?.label}
          </h1>
          <p className={styles.pageSubtitle}>
            {activeTabData?.key === "profile"     && "Manage your vessel and account information"}
            {activeTabData?.key === "offers"      && "Create and manage your service offers"}
            {activeTabData?.key === "requests"    && "Post and track service requests"}
            {activeTabData?.key === "assignments" && "View and update active job assignments"}
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT AREA ───────────────────── */}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          {children}
        </div>
      </div>
    </div>
  );
}
