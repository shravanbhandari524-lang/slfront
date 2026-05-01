// services/profileService.js

import { getProfile } from "../apiCalls.js";

export async function fetchProfile(token, user) {
  const data = await getProfile(token, user.uuid);

  return {
    uuid: user.uuid,
    username: user.username,
    type: user.role,
    imo: data?.[0]?.imo,
    created_at: user.created_at,
    vendor_username: data?.[0]?.vendor_username,
  };
}
