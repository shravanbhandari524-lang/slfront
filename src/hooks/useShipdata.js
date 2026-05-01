import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Rcont } from "../context/Rcontext.jsx";
import { decodeToken } from "../services/decodeToken.js";
import {
  refreshAccessToken,
  getProfile,
  getOffers,
  createOffer,
  logout,
} from "../api/index.js";

export function useShipData() {
  const navigate = useNavigate();
  const { setToken } = useContext(Rcont);

  const [profile, setProfile] = useState(null);
  const [offers, setOffers] = useState([]);
  const [token, setLocalToken] = useState(null);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [services, setServices] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const { access } = await refreshAccessToken();

        setToken(access);
        setLocalToken(access);

        const decoded = decodeToken(access);
        setUser(decoded);

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
  }, [navigate, setToken]);

  const refreshOffers = async () => {
    if (!token || !user) return;

    const data = await getOffers(token, user.uuid);
    setOffers(data.data);
    localStorage.setItem("offers", JSON.stringify(data.data));
  };

  const handleCreateOffer = async (value) => {
    if (!token || !user) return;

    await createOffer(token, value);
    await refreshOffers();
  };

  const handlesubmitoffer = () => {
    if (!profile?.uuid) return;

    handleCreateOffer({
      vessel_id: profile.uuid,
      lat: Number(lat),
      lng: Number(lng),
      services,
    });

    setLat("");
    setLng("");
    setServices("");
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/login");
    }
  };

  return {
    lat,
    lng,
    services,
    setLat,
    setLng,
    setServices,
    profile,
    offers,
    loading,
    refreshOffers,
    handleCreateOffer,
    handlesubmitoffer,
    handleLogout,
  };
}
