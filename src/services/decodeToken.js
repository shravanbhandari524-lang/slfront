// services/decodeToken.js
import { jwtDecode } from "jwt-decode";

export function decodeToken(token) {
  try {
    const payload = jwtDecode(token);
    return {
      uuid: payload.uuid,
      username: payload.username,
      role: payload.role,
      created_at: payload.created_at,
    };
  } catch {
    return null;
  }
}

export function getRole(token) {
  try {
    const payload = jwtDecode(token);
    return payload?.role ?? null;
  } catch {
    return null;
  }
}
