import { fetchOffers } from "./offerService.js";
export async function refreshOffers(token, user, setOffers) {
  const data = await fetchOffers(token, user);

  setOffers(data);
  localStorage.setItem("offers", JSON.stringify(data));
}
