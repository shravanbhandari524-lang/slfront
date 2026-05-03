import { useState } from "react";
import Sidebar from "../Sidebar.jsx";
import StatusBadge from "../../components/ui/StatusBadge.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import ServiceChips from "../../components/ui/ServiceChips.jsx";
import MapPicker from "../../components/ui/MapPicker.jsx";
import { useToast } from "../../components/ui/Toast.jsx";
import { IconPackage, IconPlus, IconEdit, IconTrash } from "../Icons.jsx";
import styles from "./OffersPage.module.css";

const SIDEBAR_ITEMS = [
  { key: "active", label: "Active Offers", icon: <IconPackage size={14} /> },
  { key: "create", label: "Create Offer",  icon: <IconPlus size={14} /> },
  { key: "update", label: "Update Offer",  icon: <IconEdit size={14} /> },
  { key: "delete", label: "Delete Offer",  icon: <IconTrash size={14} /> },
];

export default function OffersPage({
  profile, offers, refreshOffers,
  lat, lng, services, setLat, setLng, setServices,
  handleCreateOffer,
}) {
  const [active, setActive] = useState("active");
  const toast = useToast();

  const [updateOfferId, setUpdateOfferId]   = useState("");
  const [updateLat, setUpdateLat]           = useState("");
  const [updateLng, setUpdateLng]           = useState("");
  const [updateServices, setUpdateServices] = useState("");

  const [deleteOfferId, setDeleteOfferId]   = useState("");
  const [deleteConfirm, setDeleteConfirm]   = useState(false);

  const onCreateOffer = async () => {
    await handleCreateOffer();
    toast("Offer created successfully", "success");
  };

  const selectForUpdate = (offer) => {
    setUpdateOfferId(offer.id || "");
    setUpdateLat(offer.lat || "");
    setUpdateLng(offer.lng || "");
    setUpdateServices(offer.serv || "");
    setActive("update");
  };

  const selectForDelete = (offer) => {
    setDeleteOfferId(offer.id || "");
    setDeleteConfirm(false);
    setActive("delete");
  };

  return (
    <>
      <Sidebar items={SIDEBAR_ITEMS} activeKey={active} onSelect={setActive} />
      <div className={styles.main}>

        {/* ── ACTIVE OFFERS ── */}
        {active === "active" && (
          <div className={styles.fadeIn}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Active Offers</h2>
              <button className={styles.btnSecondary} onClick={refreshOffers}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
                Refresh
              </button>
            </div>

            {offers && offers.length > 0 ? (
              <div className={styles.cardGrid}>
                {offers.map((item, i) => (
                  <div key={i} className={styles.offerCard}>
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
              <EmptyState
                icon="📦"
                title="No active offers"
                message="Create your first offer to get started with vessel services."
                actionLabel="Create Offer"
                onAction={() => setActive("create")}
              />
            )}
          </div>
        )}

        {/* ── CREATE OFFER ── */}
        {active === "create" && (
          <div className={styles.fadeIn}>
            <h2 className={styles.sectionTitle}>Create Offer</h2>
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                <span className={styles.formCardHeaderIcon}>📦</span>
                <span className={styles.formCardHeaderTitle}>New Service Offer</span>
              </div>
              <div className={styles.formCardBody}>
                <div className={styles.formSection}>
                  <label className={styles.formSectionLabel}>Location</label>
                  <MapPicker lat={lat} lng={lng} onLatChange={setLat} onLngChange={setLng} />
                </div>
                <div className={styles.formSection}>
                  <label className={styles.formSectionLabel}>Services</label>
                  <ServiceChips value={services} onChange={setServices} />
                </div>
                <div className={styles.formActions}>
                  <button className={styles.btnPrimary} onClick={onCreateOffer}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                    Create Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── UPDATE OFFER ── */}
        {active === "update" && (
          <div className={styles.fadeIn}>
            <h2 className={styles.sectionTitle}>Update Offer</h2>
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                <span className={styles.formCardHeaderIcon}>✏️</span>
                <span className={styles.formCardHeaderTitle}>Edit Service Offer</span>
              </div>
              <div className={styles.formCardBody}>
                <div className={styles.formSection}>
                  <label className={styles.formSectionLabel}>Offer UUID</label>
                  <input type="text" className={styles.formInput} placeholder="Enter offer UUID" value={updateOfferId} onChange={(e) => setUpdateOfferId(e.target.value)} />
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
                  <button className={styles.btnSecondary}>Update Offer</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── DELETE OFFER ── */}
        {active === "delete" && (
          <div className={styles.fadeIn}>
            <h2 className={styles.sectionTitle}>Delete Offer</h2>
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                <span className={styles.formCardHeaderIcon}>🗑️</span>
                <span className={styles.formCardHeaderTitle}>Remove Service Offer</span>
              </div>
              <div className={styles.formCardBody}>
                <div className={styles.formSection}>
                  <label className={styles.formSectionLabel}>Offer UUID</label>
                  <input type="text" className={styles.formInput} placeholder="Enter offer UUID to delete" value={deleteOfferId} onChange={(e) => setDeleteOfferId(e.target.value)} />
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
                    I confirm I want to delete this offer
                  </label>
                  <button className={styles.btnDanger} disabled={!deleteConfirm || !deleteOfferId}>Delete Offer</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
