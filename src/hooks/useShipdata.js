import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Rcont } from "../context/Rcontext.jsx";
import { decodeToken } from "../services/decodeToken.js";
import { refreshAccessToken, getProfile, getOffers } from "../api/index.js";

export function useShipData() {
  const navigate = useNavigate();
  const { setToken } = useContext(Rcont);

  const [profile, setProfile] = useState(null);
  const [offers, setOffers] = useState([]);
  const [token, setLocalToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // 1. Auth
        const { access } = await refreshAccessToken();
        setToken(access);
        setLocalToken(access);
        const decoded = decodeToken(access);
        setUser(decoded);

        // 2. Profile
        const cachedProfile = localStorage.getItem("profile");
        let profileData;
        if (cachedProfile) {
          profileData = JSON.parse(cachedProfile);
        } else {
          const data = await getProfile(access, decoded.uuid);
          profileData = {
            uuid: decoded.uuid,
            username: decoded.username,
            type: decoded.role,
            imo: data?.[0]?.imo,
            created_at: decoded.created_at,
            vendor_username: data?.[0]?.vendor_username,
          };
          localStorage.setItem("profile", JSON.stringify(profileData));
        }
        setProfile(profileData);

        // 3. Offers
        const cachedOffers = localStorage.getItem("offers");
        if (cachedOffers) {
          setOffers(JSON.parse(cachedOffers));
        } else {
          const data = await getOffers(access, decoded.uuid);
          setOffers(data.data);
          localStorage.setItem("offers", JSON.stringify(data.data));
        }
      } catch {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const refreshOffers = async () => {
    if (!token || !user) return;
    const data = await getOffers(token, user.uuid);
    setOffers(data.data);
    localStorage.setItem("offers", JSON.stringify(data.data));
  };

  return { profile, offers, loading, refreshOffers };
}
