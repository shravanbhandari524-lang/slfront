import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRole } from "../services/decodeToken.js";
import { useContext } from "react";
import { Rcont } from "../context/Rcontext.jsx";
import styles from "../modular_css/Login.module.css";

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useContext(Rcont);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt...");

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.access);
        const role = getRole(data.access);
        if (role == 0) {
          navigate("/");
          setToken("");
        } else if (role == "admin") {
          navigate("/admin");
        } else if (role == "ship") {
          navigate("/ship");
        }
      } else {
        const errort = await res.text();
        console.log("Server error:", errort);
      }
    } catch (err) {
      console.log("Network error:", err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>

        <div className={styles.brand}>
          <div className={styles.brandIcon}>⚓</div>
          <span className={styles.brandName}>SEALINE</span>
        </div>

        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to your account to continue</p>

        <div className={styles.divider} />

        <form className={styles.form} onSubmit={handleSubmit}>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <span className={styles.labelIcon}><UserIcon /></span>
              Username
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}><UserIcon /></span>
              <input
                className={styles.input}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <span className={styles.labelIcon}><LockIcon /></span>
              Password
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}><LockIcon /></span>
              <input
                className={styles.input}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button className={styles.submitBtn} type="submit">
            <span className={styles.btnText}>
              Sign In
              <span className={styles.btnArrow}><ArrowRightIcon /></span>
            </span>
          </button>

        </form>
      </div>
    </div>
  );
}
