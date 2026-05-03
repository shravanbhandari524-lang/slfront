const BASE = "";

async function request(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      "ngrok-skip-browser-warning": "true",
      ...options.headers,
    },
  });

  if (res.status === 401) {
    try {
      const refreshed = await fetch(`/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      if (!refreshed.ok) throw new Error("refresh failed");

      const { access } = await refreshed.json();

      const retry = await fetch(url, {
        ...options,
        headers: {
          "ngrok-skip-browser-warning": "true",
          ...options.headers,
          Authorization: `Bearer ${access}`,
        },
      });
      if (!retry.ok) throw new Error(`Retry failed: ${url}`);
      return retry.json();
    } catch {
      window.location.href = "/login";
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
  request(`/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

export const refreshAccessToken = () =>
  request(`/api/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

export const getProfile = (token, uuid) =>
  request(`/api/ships/me/${uuid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOffers = (token, uuid) =>
  request(`/api/offers/getOffers/${uuid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createOffer = (token, body) =>
  request(`/api/offers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const updateOffer = (token, id, body) =>
  request(`/api/offers/` + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const deleteOffer = (token, id) =>
  request(`/api/offers/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

export const logout = () =>
  request(`/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
