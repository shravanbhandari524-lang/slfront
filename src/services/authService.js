// services/authService.js

export async function refreshAccessToken() {
  const res = await fetch("http://localhost:8080/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const err = new Error("Refresh failed");
    err.statusCode = res.status;
    throw err;
  }

  return res.json();
}
