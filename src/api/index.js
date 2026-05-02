const BASE =
  " https://b0d1-2401-4900-8839-ae14-26c1-f776-2d36-d6bd.ngrok-free.app";

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

export const refreshAccessToken = async () =>
  request(`${BASE}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

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
export const updateOffer = (token, id, body) =>
  request(`${BASE}/offers/` + id, {
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
export const logout = async () =>
  request(`${BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
