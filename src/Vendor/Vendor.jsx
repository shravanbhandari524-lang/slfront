import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Rcont } from "../context/Rcontext.jsx";
import styles from "./Vendor.module.css";

export default function Vendor() {
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
          <span className={styles.navTitle}>SEALINE</span>
        </div>
        <div className={styles.navRight}>
          <span className={styles.navRole}>Vendor</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.placeholder}>
          <div className={styles.placeholderIcon}>🏪</div>
          <h1 className={styles.placeholderTitle}>Vendor Portal</h1>
          <p className={styles.placeholderSubtitle}>
            Your vendor dashboard is being set up. Service management tools will appear here.
          </p>
        </div>
      </main>
    </div>
  );
}
