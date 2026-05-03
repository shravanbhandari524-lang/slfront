import { useState } from "react";
import Sidebar from "../Sidebar.jsx";
import StatusBadge from "../../components/ui/StatusBadge.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import ServiceChips from "../../components/ui/ServiceChips.jsx";
import MapPicker from "../../components/ui/MapPicker.jsx";
import styles from "./RequestsPage.module.css";

const SIDEBAR_ITEMS = [
  { key: "all",    label: "All Requests",    icon: "📋" },
  { key: "create", label: "Create Request",  icon: "➕" },
  { key: "update", label: "Update Request",  icon: "✏️" },
  { key: "delete", label: "Delete Request",  icon: "🗑️" },
];

export default function RequestsPage({ profile, requests }) {
  const [active, setActive] = useState("all");

  const [reqLat, setReqLat]             = useState("");
  const [reqLng, setReqLng]             = useState("");
  const [reqServices, setReqServices]   = useState("");

  const [updateReqId, setUpdateReqId]           = useState("");
  const [updateLat, setUpdateLat]               = useState("");
  const [updateLng, setUpdateLng]               = useState("");
  const [updateServices, setUpdateServices]     = useState("");

  const [deleteReqId, setDeleteReqId]           = useState("");
  const [deleteConfirm, setDeleteConfirm]       = useState(false);

  const selectForUpdate = (req) => {
    setUpdateReqId(req.id || "");
    setUpdateLat(req.lat || "");
    setUpdateLng(req.lng || "");
    setUpdateServices(req.serv || "");
    setActive("update");
  };

  const selectForDelete = (req) => {
    setDeleteReqId(req.id || "");
    setDeleteConfirm(false);
    setActive("delete");
  };

  return (
    <>
      <Sidebar items={SIDEBAR_ITEMS} activeKey={active} onSelect={setActive} />
      <div className={styles.main}>

        {/* ── ALL REQUESTS ── */}
        {active === "all" && (
          <div className={styles.fadeIn}>
            <h2 className={styles.sectionTitle}>All Requests</h2>
            {requests && requests.length > 0 ? (
              <div className={styles.cardGrid}>
                {requests.map((item, i) => (
                  <div key={i} className={styles.reqCard}>
                    <div className={styles.cardStripe} />
                    <div className={styles.cardHead}>
                      <div className={styles.cardIndex}>#{i + 1}</div>
                      <StatusBadge status={item?.status} />
                    </div>
                    <div className={styles.cardTop}>
                      <div className={styles.cardServices}>
                        {(item?.serv || "—").split(",").map((s, j) => (
                          <span key={j} className={styles.serviceTag}>{s.trim()}</span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.coordPill}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                          <circle cx="12" cy="9" r="2.5"/>
                        </svg>
                        {item?.lat}, {item?.lng}
                      </div>
                      <div className={styles.cardMeta}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2"/>
                          <path d="M16 2v4M8 2v4M3 10h18"/>
                        </svg>
                        {item?.created_at ? new Date(item.created_at).toLocaleString() : "—"}
                      </div>
                    </div>
                    <div className={styles.cardActions}>
                      <button className={styles.btnIcon} onClick={() => selectForUpdate(item)} title="Edit">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button className={styles.btnIconDanger} onClick={() => selectForDelete(item)} title="Delete">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          <path d="M10 11v6M14 11v6"/>
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon="📋" title="No requests yet" message="Create a service request to get started." actionLabel="Create Request" onAction={() => setActive("create")} />
            )}
          </div>
        )}

        {/* ── CREATE REQUEST ── */}
        {active === "create" && (
          <div className={styles.fadeIn}>
            <h2 className={styles.sectionTitle}>Create Request</h2>
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                <span className={styles.formCardHeaderIcon}>📋</span>
                <span className={styles.formCardHeaderTitle}>New Service Request</span>
              </div>
              <div className={styles.formCardBody}>
                <div className={styles.formSection}>
                  <label className={styles.formSectionLabel}>Location</label>
                  <MapPicker lat={reqLat} lng={reqLng} onLatChange={setReqLat} onLngChange={setReqLng} />
                </div>
                <div className={styles.formSection}>
                  <label className={styles.formSectionLabel}>Services Required</label>
                  <ServiceChips value={reqServices} onChange={setReqServices} />
                </div>
                <div className={styles.formActions}>
                  <button className={styles.btnPrimary}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                    Create Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── UPDATE REQUEST ── */}
        {active === "update" && (
          <div className={styles.fadeIn}>
            <h2 className={styles.sectionTitle}>Update Request</h2>
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                <span className={styles.formCardHeaderIcon}>✏️</span>
                <span className={styles.formCardHeaderTitle}>Edit Service Request</span>
              </div>
              <div className={styles.formCardBody}>
                <div className={styles.formSection}>
                  <label className={styles.formSectionLabel}>Request UUID</label>
                  <input type="text" className={styles.formInput} placeholder="Enter request UUID" value={updateReqId} onChange={(e) => setUpdateReqId(e.target.value)} />
                </div>
                <div className={styles.formSection}>
                  <label className={styles.formSectionLabel}>Location</label>
                  <MapPicker lat={updateLat} lng={updateLng} onLatChange={setUpdateLat} onLngChange={setUpdateLng} />
                </div>
                <div className={styles.formSection}>
                  <label className={styles.formSectionLabel}>Services</label>
                  <ServiceChips value={updateServices} onChange={setUpdateServices} />
                </div>
                <div className={styles.formActions}>
                  <button className={styles.btnSecondary}>Update Request</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── DELETE REQUEST ── */}
        {active === "delete" && (
          <div className={styles.fadeIn}>
            <h2 className={styles.sectionTitle}>Delete Request</h2>
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                <span className={styles.formCardHeaderIcon}>🗑️</span>
                <span className={styles.formCardHeaderTitle}>Remove Service Request</span>
              </div>
              <div className={styles.formCardBody}>
                <div className={styles.formSection}>
                  <label className={styles.formSectionLabel}>Request UUID</label>
                  <input type="text" className={styles.formInput} placeholder="Enter request UUID to delete" value={deleteReqId} onChange={(e) => setDeleteReqId(e.target.value)} />
                </div>
                <div className={styles.dangerZone}>
                  <div className={styles.dangerHeader}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    This action cannot be undone
                  </div>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkboxInput} checked={deleteConfirm} onChange={(e) => setDeleteConfirm(e.target.checked)} />
                    I confirm I want to delete this request
                  </label>
                  <button className={styles.btnDanger} disabled={!deleteConfirm || !deleteReqId}>Delete Request</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
