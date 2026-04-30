import { useState } from "react";
import { storeAccess } from "../services/decodeToken.js";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      console.log("Status:", res.status);

      if (res.ok) {
        const data = await res.json();
        storeAccess(data.access);
      } else {
        const errorText = await res.text();
        console.log("Error response:", errorText);
      }
    } catch (err) {
      console.log(err.message);
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
