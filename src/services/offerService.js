// services/offerService.js

import { getOffers } from "../apiCalls";

export async function fetchOffers(token, user) {
  const data = await getOffers(token, user.uuid);
  return data.data;
}
