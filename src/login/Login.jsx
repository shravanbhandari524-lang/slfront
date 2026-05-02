import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRole } from "../services/decodeToken.js";
import { useContext } from "react";
import { Rcont } from "../context/Rcontext.jsx";
import styles from "../modular_css/Login.module.css";

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
            <label className={styles.label}>Username</label>
            <input
              className={styles.input}
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
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

          <button className={styles.submitBtn} type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
