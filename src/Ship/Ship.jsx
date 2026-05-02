import styles from "./Ship.module.css";
import { useShipData } from "../hooks/useShipdata.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StatusBadge({ status }) {
  const s = (status || "").toLowerCase();
  let cls = styles.badgeInactive;
  if (s === "active" || s === "completed") cls = styles.badgeActive;
  else if (s === "pending" || s === "assigned") cls = styles.badgePending;
  return <span className={`${styles.badge} ${cls}`}>{status || "—"}</span>;
}

export default function Ship() {
  const {
    lat, lng, services,
    setLat, setLng, setServices,
    profile, offers, requests, assignments,
    refreshOffers, handleCreateOffer, handleLogout,
  } = useShipData();

  const [deleteOfferId, setDeleteOfferId] = useState("");
  const [deleteOfferConfirm, setDeleteOfferConfirm] = useState(false);
  const [updateOfferId, setUpdateOfferId] = useState("");
  const [updateLat, setUpdateLat] = useState("");
  const [updateLng, setUpdateLng] = useState("");
  const [updateServices, setUpdateServices] = useState("");

  const [reqLat, setReqLat] = useState("");
  const [reqLng, setReqLng] = useState("");
  const [reqServices, setReqServices] = useState("");
  const [deleteReqId, setDeleteReqId] = useState("");
  const [deleteReqConfirm, setDeleteReqConfirm] = useState(false);

  return (
    <div className={styles.layout}>
      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <div className={styles.navIcon}>⚓</div>
          <span className={styles.navTitle}>NavOps</span>
        </div>
        <div className={styles.navRight}>
          <span className={styles.navRole}>Ship</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </nav>

      <main className={styles.main}>
        {/* PAGE HEADER */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Ship Dashboard</h1>
          <p className={styles.pageSubtitle}>Manage your vessel's offers, requests and assignments</p>
        </div>

        {/* ── PROFILE ── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Vessel Profile</h2>
          </div>
          <div className={styles.card}>
            <div className={styles.profileGrid}>
              <div className={styles.profileField}>
                <span className={styles.profileLabel}>Username</span>
                <span className={styles.profileValue}>{profile?.username || "—"}</span>
              </div>
              <div className={styles.profileField}>
                <span className={styles.profileLabel}>IMO Number</span>
                <span className={styles.profileValue}>{profile?.imo || "—"}</span>
              </div>
              <div className={styles.profileField}>
                <span className={styles.profileLabel}>Vessel Type</span>
                <span className={styles.profileValue}>{profile?.type || "—"}</span>
              </div>
              <div className={styles.profileField}>
                <span className={styles.profileLabel}>Vendor</span>
                <span className={styles.profileValue}>{profile?.vendor_username || "—"}</span>
              </div>
              <div className={styles.profileField}>
                <span className={styles.profileLabel}>Created</span>
                <span className={styles.profileValue}>{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "—"}</span>
              </div>
              <div className={styles.profileField} style={{ gridColumn: "1 / -1" }}>
                <span className={styles.profileLabel}>UUID</span>
                <span className={styles.profileValueMono}>{profile?.uuid || "—"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── OFFERS ── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Active Offers</h2>
            <button className={styles.btnSecondary} onClick={refreshOffers}>
              ↻ Refresh
            </button>
          </div>
          <div className={styles.card}>
            {offers && offers.length > 0 ? (
              <div className={styles.offersList}>
                {offers.map((item, index) => (
                  <div key={index} className={styles.offerCard}>
                    <div className={styles.offerMeta}>
                      <span className={styles.offerService}>{item?.serv || "—"}</span>
                      <span className={styles.offerDetail}>
                        {item?.created_at ? new Date(item.created_at).toLocaleString() : "—"}
                      </span>
                      <span className={styles.offerCoords}>
                        {item?.lat}, {item?.lng}
                      </span>
                    </div>
                    <div />
                    <StatusBadge status={item?.status} />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📦</span>
                <span className={styles.emptyText}>No active offers yet</span>
              </div>
            )}
          </div>
        </section>

        {/* ── CREATE OFFER ── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Create Offer</h2>
          </div>
          <div className={styles.card}>
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.formInputFullWidth}`}>
                <label className={styles.formLabel}>Ship UUID</label>
                <div className={styles.formInputReadonly}>{profile?.uuid || "—"}</div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Latitude</label>
                <input
                  type="number"
                  className={styles.formInput}
                  placeholder="e.g. 48.8566"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Longitude</label>
                <input
                  type="number"
                  className={styles.formInput}
                  placeholder="e.g. 2.3522"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  required
                />
              </div>
              <div className={`${styles.formGroup} ${styles.formInputFullWidth}`}>
                <label className={styles.formLabel}>Services</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="e.g. Fuel, Maintenance, Supplies"
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={styles.formActions}>
              <button className={styles.btnPrimary} onClick={handleCreateOffer}>
                Create Offer
              </button>
            </div>
          </div>
        </section>

        {/* ── UPDATE OFFER ── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Update Offer</h2>
          </div>
          <div className={styles.card}>
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.formInputFullWidth}`}>
                <label className={styles.formLabel}>Offer UUID</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Enter offer UUID"
                  value={updateOfferId}
                  onChange={(e) => setUpdateOfferId(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Latitude</label>
                <input
                  type="number"
                  className={styles.formInput}
                  placeholder="New latitude"
                  value={updateLat}
                  onChange={(e) => setUpdateLat(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Longitude</label>
                <input
                  type="number"
                  className={styles.formInput}
                  placeholder="New longitude"
                  value={updateLng}
                  onChange={(e) => setUpdateLng(e.target.value)}
                />
              </div>
              <div className={`${styles.formGroup} ${styles.formInputFullWidth}`}>
                <label className={styles.formLabel}>Services</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Updated services"
                  value={updateServices}
                  onChange={(e) => setUpdateServices(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.formActions}>
              <button className={styles.btnSecondary}>Update Offer</button>
            </div>
          </div>
        </section>

        {/* ── DELETE OFFER ── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Delete Offer</h2>
          </div>
          <div className={styles.card}>
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.formInputFullWidth}`}>
                <label className={styles.formLabel}>Offer UUID</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Enter offer UUID to delete"
                  value={deleteOfferId}
                  onChange={(e) => setDeleteOfferId(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.formActions}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={deleteOfferConfirm}
                  onChange={(e) => setDeleteOfferConfirm(e.target.checked)}
                />
                Confirm deletion
              </label>
              <button className={styles.btnDanger} disabled={!deleteOfferConfirm}>
                Delete Offer
              </button>
            </div>
          </div>
        </section>

        {/* ── REQUESTS ── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Requests</h2>
          </div>

          {/* list */}
          <div className={styles.card}>
            <p style={{ fontSize: "var(--font-xs)", color: "var(--text-muted)", marginBottom: "var(--space-4)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>All Requests</p>
            {requests && requests.length > 0 ? (
              <div className={styles.offersList}>
                {requests.map((item, index) => (
                  <div key={index} className={styles.offerCard}>
                    <div className={styles.offerMeta}>
                      <span className={styles.offerService}>{item?.serv || "—"}</span>
                      <span className={styles.offerDetail}>{item?.created_at ? new Date(item.created_at).toLocaleString() : "—"}</span>
                      <span className={styles.offerCoords}>{item?.lat}, {item?.lng}</span>
                    </div>
                    <div />
                    <StatusBadge status={item?.status} />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📋</span>
                <span className={styles.emptyText}>No requests yet</span>
              </div>
            )}
          </div>

          {/* create request */}
          <div className={styles.card}>
            <p style={{ fontSize: "var(--font-xs)", color: "var(--text-muted)", marginBottom: "var(--space-4)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>Create Request</p>
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.formInputFullWidth}`}>
                <label className={styles.formLabel}>Ship UUID</label>
                <div className={styles.formInputReadonly}>{profile?.uuid || "—"}</div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Latitude</label>
                <input type="number" className={styles.formInput} placeholder="e.g. 48.8566" value={reqLat} onChange={(e) => setReqLat(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Longitude</label>
                <input type="number" className={styles.formInput} placeholder="e.g. 2.3522" value={reqLng} onChange={(e) => setReqLng(e.target.value)} />
              </div>
              <div className={`${styles.formGroup} ${styles.formInputFullWidth}`}>
                <label className={styles.formLabel}>Services</label>
                <input type="text" className={styles.formInput} placeholder="Required services" value={reqServices} onChange={(e) => setReqServices(e.target.value)} />
              </div>
            </div>
            <div className={styles.formActions}>
              <button className={styles.btnPrimary}>Create Request</button>
            </div>
          </div>

          {/* update request */}
          <div className={styles.card}>
            <p style={{ fontSize: "var(--font-xs)", color: "var(--text-muted)", marginBottom: "var(--space-4)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>Update Request</p>
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.formInputFullWidth}`}>
                <label className={styles.formLabel}>Request UUID</label>
                <input type="text" className={styles.formInput} placeholder="Enter request UUID" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Latitude</label>
                <input type="number" className={styles.formInput} placeholder="New latitude" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Longitude</label>
                <input type="number" className={styles.formInput} placeholder="New longitude" />
              </div>
              <div className={`${styles.formGroup} ${styles.formInputFullWidth}`}>
                <label className={styles.formLabel}>Services</label>
                <input type="text" className={styles.formInput} placeholder="Updated services" />
              </div>
            </div>
            <div className={styles.formActions}>
              <button className={styles.btnSecondary}>Update Request</button>
            </div>
          </div>

          {/* delete request */}
          <div className={styles.card}>
            <p style={{ fontSize: "var(--font-xs)", color: "var(--text-muted)", marginBottom: "var(--space-4)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>Delete Request</p>
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.formInputFullWidth}`}>
                <label className={styles.formLabel}>Request UUID</label>
                <input type="text" className={styles.formInput} placeholder="Enter request UUID to delete" value={deleteReqId} onChange={(e) => setDeleteReqId(e.target.value)} />
              </div>
            </div>
            <div className={styles.formActions}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkboxInput} checked={deleteReqConfirm} onChange={(e) => setDeleteReqConfirm(e.target.checked)} />
                Confirm deletion
              </label>
              <button className={styles.btnDanger} disabled={!deleteReqConfirm}>Delete Request</button>
            </div>
          </div>
        </section>

        {/* ── ASSIGNMENTS ── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Assignments</h2>
          </div>
          <div className={styles.card}>
            {assignments && assignments.length > 0 ? (
              <div className={styles.offersList}>
                {assignments.map((item, index) => (
                  <div key={index} className={styles.assignmentCard}>
                    <div className={styles.assignmentField}>
                      <span className={styles.assignmentLabel}>Offer ID</span>
                      <span className={styles.assignmentValue}>{item?.id || "—"}</span>
                    </div>
                    <div className={styles.assignmentField}>
                      <span className={styles.assignmentLabel}>Status</span>
                      <StatusBadge status={item?.status} />
                    </div>
                    <div className={styles.assignmentField}>
                      <span className={styles.assignmentLabel}>Services</span>
                      <span className={styles.assignmentValue}>{item?.serv || "—"}</span>
                    </div>
                    <div className={styles.assignmentField}>
                      <span className={styles.assignmentLabel}>Request Vessel</span>
                      <span className={styles.assignmentValue}>{item?.request_vessel_id || "—"}</span>
                    </div>
                    <div className={styles.assignmentField}>
                      <span className={styles.assignmentLabel}>Assigned</span>
                      <span className={styles.assignmentValue}>{item?.assigned_time ? new Date(item.assigned_time).toLocaleString() : "—"}</span>
                    </div>
                    <div className={styles.assignmentField}>
                      <span className={styles.assignmentLabel}>Completed</span>
                      <span className={styles.assignmentValue}>{item?.completed_time ? new Date(item.completed_time).toLocaleString() : "—"}</span>
                    </div>
                    <div className={styles.assignmentField}>
                      <span className={styles.assignmentLabel}>Coordinates</span>
                      <span className={styles.assignmentValue}>{item?.lat}, {item?.lng}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>🗂️</span>
                <span className={styles.emptyText}>No assignments yet</span>
              </div>
            )}
          </div>

          {/* current assignment status update */}
          <div className={styles.card}>
            <p style={{ fontSize: "var(--font-xs)", color: "var(--text-muted)", marginBottom: "var(--space-4)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>Update Assignment Status</p>
            <div className={styles.formActions}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkboxInput} />
                Mark as assigned
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkboxInput} />
                Mark as completed
              </label>
              <button className={styles.btnPrimary}>Submit</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
