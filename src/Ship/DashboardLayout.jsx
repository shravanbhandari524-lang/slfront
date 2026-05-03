import { useState, useRef, useEffect } from "react";
import styles from "./DashboardLayout.module.css";

const TABS = [
  { key: "profile",     label: "Profile",     icon: "👤", desc: "Vessel & account" },
  { key: "offers",      label: "Offers",      icon: "📦", desc: "Service offers"   },
  { key: "requests",    label: "Requests",    icon: "📋", desc: "Service requests" },
  { key: "assignments", label: "Assignments", icon: "🗂️", desc: "Active jobs"      },
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
      setIndicator({ left: elRect.left - parentRect.left, width: elRect.width });
    }
  }, [activeTab]);

  const activeTabData = TABS.find(t => t.key === activeTab);

  return (
    <div className={styles.layout}>
      {/* Ambient background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Top Nav */}
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

        <div className={styles.navCenter}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.navTab} ${activeTab === tab.key ? styles.navTabActive : ""}`}
              onClick={() => onTabChange(tab.key)}
            >
              <span className={styles.navTabIcon}>{tab.icon}</span>
              <span className={styles.navTabLabel}>{tab.label}</span>
              {activeTab === tab.key && <div className={styles.navTabBar} />}
            </button>
          ))}
        </div>

        <div className={styles.navRight}>
          <div className={styles.navStatus}>
            <span className={styles.navStatusDot} />
            <span className={styles.navStatusLabel}>Online</span>
          </div>
          <div className={styles.navRolePill}>
            <span className={styles.navRoleIcon}>🚢</span>
            <span className={styles.navRoleLabel}>Ship</span>
          </div>
          <button className={styles.logoutBtn} onClick={onLogout}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign out
          </button>
        </div>
      </nav>

      {/* Page Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerBreadcrumb}>
            <span className={styles.breadcrumbRoot}>Dashboard</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span className={styles.breadcrumbCurrent}>{activeTabData?.label}</span>
          </div>
          <h1 className={styles.pageTitle}>
            <span className={styles.pageTitleIcon}>{activeTabData?.icon}</span>
            {activeTabData?.label}
          </h1>
          <p className={styles.pageSubtitle}>{activeTabData?.desc}</p>
        </div>

        <div className={styles.headerRight}>
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
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
