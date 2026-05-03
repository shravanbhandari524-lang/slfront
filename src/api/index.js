const BASE = "http://localhost:8080";

async function request(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
    },
  });

  if (res.status === 401) {
    try {
      const refreshed = await fetch(`${BASE}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (!refreshed.ok) throw new Error("refresh failed");

      const { access } = await refreshed.json();

      const retry = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${access}`,
        },
      });
      if (!retry.ok) throw new Error(`Retry failed: ${url}`);
      return retry.json();
    } catch {
      window.location.href = "/login";
      localStorage.clear();
      return;
    }
  }

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

export const loginUser = (username, password) =>
  request(`${BASE}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

export const refreshAccessToken = () =>
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
    method: "PUT",
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

export const logout = () =>
  request(`${BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
