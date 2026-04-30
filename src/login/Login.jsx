import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRole } from "../services/decodeToken.js";
import { useContext } from "react";
import { Rcont } from "../context/Rcontext.jsx";
export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useContext(Rcont);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hoi");

    try {
      const res1 = await fetch("http://localhost:8080/auth/refersh");
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
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
        const errort = await res.text(); // ✅ fixed
        console.log("Server error:", errort);
      }
    } catch (err) {
      console.log("Network error:", err.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>username</label>
          <input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
