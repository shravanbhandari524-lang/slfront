// services/apiCalls.js

// -----------------------------
// GET PROFILE
// -----------------------------
export async function getProfile(token, uuid) {
  const res = await fetch(`http://localhost:8080/ships/me/${uuid}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // throw custom error
  if (!res.ok) {
    const err = new Error("Failed to fetch profile");

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

// -----------------------------
// GET OFFERS
// -----------------------------
export async function getOffers(token, uuid) {
  const res = await fetch(`http://localhost:8080/offers/getOffers/${uuid}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const err = new Error("Failed to fetch offers");

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

// -----------------------------
// CREATE OFFER
// -----------------------------
export async function createOffer(token, body) {
  const res = await fetch("http://localhost:8080/offers", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = new Error("Failed to create offer");

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

// -----------------------------
// DELETE OFFER
// -----------------------------
export async function deleteOffer(token, offerId) {
  const res = await fetch(`http://localhost:8080/offers/${offerId}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = new Error("Failed to delete offer");

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
