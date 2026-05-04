import styles from "./DashboardLayout.module.css";
import {
  IconUser, IconPackage, IconClipboard, IconBriefcase,
  IconAnchor, IconShip, IconMap
} from "./Icons.jsx";

const TABS = [
  { key: "profile",     label: "Profile",     Icon: IconUser },
  { key: "offers",      label: "Offers",      Icon: IconPackage },
  { key: "requests",    label: "Requests",    Icon: IconClipboard },
  { key: "assignments", label: "Assignments", Icon: IconBriefcase },
  { key: "map",         label: "Map",         Icon: IconMap },
];

export default function DashboardLayout({ activeTab, onTabChange, onLogout, children }) {
  const activeTabData = TABS.find(t => t.key === activeTab);
  const ActiveIcon    = activeTabData?.Icon;

  return (
    <div className={styles.layout}>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.orb3} aria-hidden="true" />

      {/* ── TOP NAV ─────────────────────────────── */}
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <div className={styles.navIconWrap}>
            <div className={styles.navIcon}>
              <IconAnchor size={18} />
            </div>
          </div>
          <div className={styles.navBrandText}>
            <span className={styles.navTitle}>SEALINE</span>
            <span className={styles.navSubtitle}>Maritime Operations</span>
          </div>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navStatus}>
            <span className={styles.navStatusDot} />
            <span className={styles.navStatusLabel}>Online</span>
          </div>
          <div className={styles.navRolePill}>
            <IconShip size={13} />
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

      {/* ── PAGE TITLE BAR ──────────────────────── */}
      <div className={styles.titleBar}>
        <div className={styles.titleBarInner}>
          <div className={styles.titleLeft}>
            <div className={styles.breadcrumb}>
              <span className={styles.breadcrumbRoot}>Ship Dashboard</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              <span className={styles.breadcrumbCurrent}>{activeTabData?.label}</span>
            </div>
            <h1 className={styles.pageTitle}>
              {ActiveIcon && (
                <span className={styles.pageTitleIcon}><ActiveIcon size={24} /></span>
              )}
              <span className={styles.pageTitleText}>{activeTabData?.label}</span>
            </h1>
            <p className={styles.pageSubtitle}>
              {activeTabData?.key === "profile"     && "Manage your vessel and account information"}
              {activeTabData?.key === "offers"      && "Create and manage your service offers"}
              {activeTabData?.key === "requests"    && "Post and track service requests"}
              {activeTabData?.key === "assignments" && "View and update active job assignments"}
              {activeTabData?.key === "map"         && "View live vessel tracking and operations"}
            </p>
          </div>

          <div className={styles.titleRight}>
            <div className={styles.tabPill}>
              {TABS.map(tab => {
                const TabIcon = tab.Icon;
                return (
                  <button
                    key={tab.key}
                    className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ""}`}
                    onClick={() => onTabChange(tab.key)}
                  >
                    <span className={styles.tabIcon}><TabIcon size={14} /></span>
                    <span className={styles.tabLabel}>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
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
