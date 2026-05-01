// hooks/useOffers.js

import { useCallback, useState } from "react";
import { fetchOffers } from "../services/offerService.js";

export function useOffers(token, refreshToken) {
  const [offers, setOffers] = useState([]);

  const loadOffers = useCallback(
    async (user) => {
      if (!user || !token) return;

      try {
        const cached = localStorage.getItem("offers");

        if (cached) {
          setOffers(JSON.parse(cached));
          return;
        }

        const data = await fetchOffers(token, user);
        setOffers(data);
        localStorage.setItem("offers", JSON.stringify(data));
      } catch (err) {
        if (err?.statusCode === 401) {
          const newUser = await refreshToken();

          if (newUser) {
            loadOffers(newUser);
          }
        }
      }
    },
    [token, refreshToken],
  );

  return {
    offers,
    loadOffers,
    setOffers,
  };
}
