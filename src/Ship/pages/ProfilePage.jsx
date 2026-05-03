import { useState } from "react";
import Sidebar from "../Sidebar.jsx";
import styles from "./ProfilePage.module.css";

const SIDEBAR_ITEMS = [
  { key: "overview", label: "Overview", icon: "📊" },
  { key: "vessel", label: "Vessel Details", icon: "🚢" },
  { key: "activity", label: "Activity", icon: "📈" },
];

export default function ProfilePage({ profile }) {
  const [active, setActive] = useState("overview");

  return (
    <>
      <Sidebar items={SIDEBAR_ITEMS} activeKey={active} onSelect={setActive} />
      <div className={styles.main}>
        {active === "overview" && (
          <div className={styles.fadeIn}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <div className={styles.statGrid}>
              <div className={styles.statCard}>
                <span className={styles.statIcon}>👤</span>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Username</span>
                  <span className={styles.statValue}>{profile?.username || "—"}</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statIcon}>🔑</span>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Role</span>
                  <span className={styles.statValue}>{profile?.type || "—"}</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statIcon}>📅</span>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Member Since</span>
                  <span className={styles.statValue}>{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "—"}</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statIcon}>🏪</span>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Vendor</span>
                  <span className={styles.statValue}>{profile?.vendor_username || "—"}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {active === "vessel" && (
          <div className={styles.fadeIn}>
            <h2 className={styles.sectionTitle}>Vessel Details</h2>
            <div className={styles.detailCard}>
              <div className={styles.detailGrid}>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>IMO Number</span>
                  <span className={styles.detailValue}>{profile?.imo || "—"}</span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>Vessel Type</span>
                  <span className={styles.detailValue}>{profile?.type || "—"}</span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>Vendor</span>
                  <span className={styles.detailValue}>{profile?.vendor_username || "—"}</span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>Created</span>
                  <span className={styles.detailValue}>{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "—"}</span>
                </div>
                <div className={`${styles.detailField} ${styles.fullWidth}`}>
                  <span className={styles.detailLabel}>UUID</span>
                  <span className={styles.detailValueMono}>{profile?.uuid || "—"}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {active === "activity" && (
          <div className={styles.fadeIn}>
            <h2 className={styles.sectionTitle}>Activity</h2>
            <div className={styles.activityCard}>
              <div className={styles.activityEmpty}>
                <span className={styles.activityIcon}>📈</span>
                <p className={styles.activityMsg}>Activity tracking coming soon</p>
                <p className={styles.activitySub}>Your vessel activity log will appear here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
