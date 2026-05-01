// hooks/useProfile.js

import { useCallback, useState } from "react";
import { fetchProfile } from "../services/profileService.js";

export function useProfile(token, refreshToken) {
  const [profile, setProfile] = useState(null);

  const loadProfile = useCallback(
    async (user) => {
      if (!user || !token) return;

      try {
        const cached = localStorage.getItem("profile");

        if (cached) {
          setProfile(JSON.parse(cached));
          return;
        }

        const value = await fetchProfile(token, user);

        localStorage.setItem("profile", JSON.stringify(value));

        setProfile(value);
      } catch (err) {
        if (err?.statusCode === 401) {
          const newUser = await refreshToken();

          if (newUser) {
            loadProfile(newUser);
          }
        }
      }
    },
    [token, refreshToken],
  );

  return {
    profile,
    loadProfile,
  };
}
