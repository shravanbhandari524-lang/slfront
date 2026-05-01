const BASE = "http://localhost:8080";

async function request(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = new Error(`Request failed: ${url}`);
    err.statusCode = res.status;
    try {
      err.data = await res.json();
    } catch {
      err.data = null;
    }
    throw err;
  }
  return res.json();
}

export const refreshAccessToken = () =>
  request(`${BASE}/auth/refresh`, { method: "POST", credentials: "include" });

export const getProfile = (token, uuid) =>
  request(`${BASE}/ships/me/${uuid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOffers = (token, uuid) =>
  request(`${BASE}/offers/getOffers/${uuid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createOffer = (token, body) =>
  request(`${BASE}/offers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const deleteOffer = (token, id) =>
  request(`${BASE}/offers/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
