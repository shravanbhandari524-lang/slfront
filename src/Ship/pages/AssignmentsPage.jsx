import { useState } from "react";
import Sidebar from "../Sidebar.jsx";
import StatusBadge from "../../components/ui/StatusBadge.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import styles from "./AssignmentsPage.module.css";

const SIDEBAR_ITEMS = [
  { key: "all", label: "All Assignments", icon: "🗂️" },
  { key: "status", label: "Update Status", icon: "🔄" },
];

const STEPS = [
  { key: "pending", label: "Requested" },
  { key: "assigned", label: "Assigned" },
  { key: "completed", label: "Completed" },
];

function getStepIndex(status) {
  const s = (status || "").toLowerCase();
  if (s === "completed") return 2;
  if (s === "assigned") return 1;
  return 0;
}

export default function AssignmentsPage({ assignments }) {
  const [active, setActive] = useState("all");
  const [selectedId, setSelectedId] = useState("");
  const [markAssigned, setMarkAssigned] = useState(false);
  const [markCompleted, setMarkCompleted] = useState(false);

  const selectForStatus = (item) => {
    setSelectedId(item.id || "");
    setMarkAssigned(false);
    setMarkCompleted(false);
    setActive("status");
  };

  return (
    <>
      <Sidebar items={SIDEBAR_ITEMS} activeKey={active} onSelect={setActive} />
      <div className={styles.main}>
        {active === "all" && (
          <div className={styles.fadeIn}>
            <h2 className={styles.sectionTitle}>All Assignments</h2>
            {assignments && assignments.length > 0 ? (
              <div className={styles.timeline}>
                {assignments.map((item, i) => {
                  const step = getStepIndex(item?.status);
                  return (
                    <div key={i} className={styles.assignCard}>
                      {/* Status Timeline */}
                      <div className={styles.progressBar}>
                        {STEPS.map((s, si) => (
                          <div key={s.key} className={styles.progressStep}>
                            <div className={`${styles.progressDot} ${si <= step ? styles.progressDotActive : ""}`}>
                              {si < step && (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                              )}
                            </div>
                            <span className={`${styles.progressLabel} ${si <= step ? styles.progressLabelActive : ""}`}>{s.label}</span>
                            {si < STEPS.length - 1 && (
                              <div className={`${styles.progressLine} ${si < step ? styles.progressLineActive : ""}`} />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className={styles.assignGrid}>
                        <div className={styles.assignField}>
                          <span className={styles.assignLabel}>Offer ID</span>
                          <span className={styles.assignValue}>{item?.id || "—"}</span>
                        </div>
                        <div className={styles.assignField}>
                          <span className={styles.assignLabel}>Status</span>
                          <StatusBadge status={item?.status} />
                        </div>
                        <div className={styles.assignField}>
                          <span className={styles.assignLabel}>Services</span>
                          <div className={styles.tagList}>
                            {(item?.serv || "—").split(",").map((s, j) => (
                              <span key={j} className={styles.tag}>{s.trim()}</span>
                            ))}
                          </div>
                        </div>
                        <div className={styles.assignField}>
                          <span className={styles.assignLabel}>Request Vessel</span>
                          <span className={styles.assignValueMono}>{item?.request_vessel_id || "—"}</span>
                        </div>
                        <div className={styles.assignField}>
                          <span className={styles.assignLabel}>Assigned</span>
                          <span className={styles.assignValue}>{item?.assigned_time ? new Date(item.assigned_time).toLocaleString() : "—"}</span>
                        </div>
                        <div className={styles.assignField}>
                          <span className={styles.assignLabel}>Completed</span>
                          <span className={styles.assignValue}>{item?.completed_time ? new Date(item.completed_time).toLocaleString() : "—"}</span>
                        </div>
                        <div className={styles.assignField}>
                          <span className={styles.assignLabel}>Coordinates</span>
                          <span className={styles.assignValueMono}>{item?.lat}, {item?.lng}</span>
                        </div>
                      </div>

                      <div className={styles.assignActions}>
                        <button className={styles.btnSecondary} onClick={() => selectForStatus(item)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          Update Status
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState icon="🗂️" title="No assignments yet" message="Assignments will appear here once offers are matched with requests." />
            )}
          </div>
        )}

        {active === "status" && (
          <div className={styles.fadeIn}>
            <h2 className={styles.sectionTitle}>Update Assignment Status</h2>
            <div className={styles.formCard}>
              <div className={styles.formSection}>
                <label className={styles.formSectionLabel}>Assignment ID</label>
                <input type="text" className={styles.formInput} placeholder="Enter assignment ID" value={selectedId} onChange={(e) => setSelectedId(e.target.value)} />
              </div>
              <div className={styles.statusOptions}>
                <label className={styles.statusOption}>
                  <input type="checkbox" className={styles.statusCheckbox} checked={markAssigned} onChange={(e) => { setMarkAssigned(e.target.checked); if (e.target.checked) setMarkCompleted(false); }} />
                  <div className={styles.statusCard}>
                    <span className={styles.statusIcon}>📌</span>
                    <div>
                      <span className={styles.statusTitle}>Mark as Assigned</span>
                      <span className={styles.statusDesc}>Confirm the assignment has been accepted</span>
                    </div>
                  </div>
                </label>
                <label className={styles.statusOption}>
                  <input type="checkbox" className={styles.statusCheckbox} checked={markCompleted} onChange={(e) => { setMarkCompleted(e.target.checked); if (e.target.checked) setMarkAssigned(false); }} />
                  <div className={styles.statusCard}>
                    <span className={styles.statusIcon}>✅</span>
                    <div>
                      <span className={styles.statusTitle}>Mark as Completed</span>
                      <span className={styles.statusDesc}>Mark the service as fully completed</span>
                    </div>
                  </div>
                </label>
              </div>
              <div className={styles.formActions}>
                <button className={styles.btnPrimary} disabled={!selectedId || (!markAssigned && !markCompleted)}>Submit Status</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
