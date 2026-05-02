import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Rcont } from "../context/Rcontext.jsx";
import styles from "./Admin.module.css";

export default function Admin() {
  const { setToken } = useContext(Rcont);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setToken("");
    navigate("/login");
  };

  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <div className={styles.navIcon}>⚓</div>
          <span className={styles.navTitle}>NavOps</span>
        </div>
        <div className={styles.navRight}>
          <span className={styles.navRole}>Admin</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.placeholder}>
          <div className={styles.placeholderIcon}>🛡️</div>
          <h1 className={styles.placeholderTitle}>Admin Console</h1>
          <p className={styles.placeholderSubtitle}>
            Your admin dashboard is being set up. Management tools will appear here.
          </p>
        </div>
      </main>
    </div>
  );
}
