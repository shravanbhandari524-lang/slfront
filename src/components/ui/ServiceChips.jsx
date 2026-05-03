import { useState } from "react";
import styles from "./ServiceChips.module.css";

const PRESETS = [
  "fuel",
  "Maintenance",
  "Supplies",
  "Towing",
  "Repairs",
  "Provisioning",
  "Medical",
  "Waste Disposal",
];

export default function ServiceChips({ value, onChange }) {
  const [custom, setCustom] = useState("");

  const selected = value
    ? value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const toggle = (service) => {
    let next;
    if (selected.includes(service)) {
      next = selected.filter((s) => s !== service);
    } else {
      next = [...selected, service];
    }
    onChange(next.join(", "));
  };

  const addCustom = () => {
    const trimmed = custom.trim();
    if (trimmed && !selected.includes(trimmed)) {
      onChange([...selected, trimmed].join(", "));
    }
    setCustom("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustom();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.chips}>
        {PRESETS.map((svc) => (
          <button
            key={svc}
            type="button"
            className={`${styles.chip} ${selected.includes(svc) ? styles.chipActive : ""}`}
            onClick={() => toggle(svc)}
          >
            {selected.includes(svc) && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
            {svc}
          </button>
        ))}
      </div>
      <div className={styles.customRow}>
        <input
          type="text"
          className={styles.customInput}
          placeholder="Add custom service…"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className={styles.addBtn}
          onClick={addCustom}
          disabled={!custom.trim()}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
      {selected.length > 0 && (
        <div className={styles.selectedList}>
          {selected
            .filter((s) => !PRESETS.includes(s))
            .map((s) => (
              <span key={s} className={styles.selectedTag}>
                {s}
                <button
                  type="button"
                  className={styles.removeTag}
                  onClick={() => toggle(s)}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
