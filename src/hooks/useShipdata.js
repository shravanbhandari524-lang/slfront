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
  updateOffer,
  deleteOffer,
} from "../api/index.js";

export function useShipData() {
  const navigate = useNavigate();
  const { setToken: setGlobalToken } = useContext(Rcont);

  const [profile, setProfile] = useState(null);
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [token, setLocalToken] = useState(null);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [services, setServices] = useState("");

  // ---------------- AUTH HELPERS ----------------

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.clear();
    setProfile(null);
    setOffers([]);
    setUser(null);
    setLocalToken(null);

    navigate("/", { replace: true });
  };

  const refreshAuth = async () => {
    const { access } = await refreshAccessToken();
    setGlobalToken(access);
    setLocalToken(access);

    const decoded = decodeToken(access);
    setUser(decoded);

    return { access, decoded };
  };

  // ---------------- INIT ----------------

  useEffect(() => {
    const init = async () => {
      try {
        const { access, decoded } = await refreshAuth();

        const cachedProfile = localStorage.getItem("profile");

        let profileData;

        if (cachedProfile) {
          profileData = JSON.parse(cachedProfile);
        } else {
          const { data } = await getProfile(access, decoded.uuid);

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

        const offersRes = await getOffers(access, decoded.uuid);
        setOffers(offersRes.data);
        localStorage.setItem("offers", JSON.stringify(offersRes.data));
      } catch (err) {
        console.error("INIT ERROR:", err);
        await handleLogout();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // ---------------- REFRESH OFFERS ----------------

  const refreshOffers = async () => {
    try {
      if (!token || !user) return;
      const data = await getOffers(token, user.uuid);
      setOffers(data.data);
      localStorage.setItem("offers", JSON.stringify(data.data));
    } catch (err) {
      if (err?.statusCode === 401) {
        try {
          const { access, decoded } = await refreshAuth();

          const data = await getOffers(access, decoded.uuid);
          setOffers(data.data);
        } catch (e) {
          console.error("Refresh failed:", e);
          await handleLogout();
        }
      } else {
        console.error(err);
      }
    }
  };

  // ---------------- CREATE OFFER ----------------

  const handleCreateOffer = async () => {
    try {
      if (!profile?.uuid || !token || !user) return;

      if (!lat || !lng || !services) {
        alert("fill all data in creating offer");
        return 0;
      }

      const value = {
        vessel_id: profile.uuid,
        lat: Number(lat),
        lng: Number(lng),
        services,
      };

      const data = await createOffer(token, value);

      if (!data.success) {
        if (data.type === "out_of_bound") alert("coordinates out of bound");
        else if (data.type === "out_of_ocean")
          alert("coordinates out of ocean");
        return 0;
      }

      setOffers((prev) => [
        ...prev,
        {
          id: data.data[0].offer_id,
          serv: data.data[0].services,
          status: data.data[0].status,
          created_at: data.data[0].created_at,
          lat: data.data[0].lat,
          lng: data.data[0].lng,
        },
      ]);

      setLat("");
      setLng("");
      setServices("");

      return 1;
    } catch (err) {
      if (err?.statusCode === 401) {
        try {
          const { access, decoded } = await refreshAuth();

          const value = {
            vessel_id: profile.uuid,
            lat: Number(lat),
            lng: Number(lng),
            services,
          };

          await createOffer(access, value);
          await refreshOffers();

          return 1;
        } catch (e) {
          console.error(e);
          await handleLogout();
        }
      } else {
        console.error(err);
      }
    }
  };

  // ---------------- UPDATE OFFER ----------------

  const handleUpdateOffer = async (id, value) => {
    try {
      if (!profile?.uuid || !token || !user) return;

      const data = await updateOffer(token, id, value);

      if (!data.success) {
        if (data.type === "out_of_bound") alert("coordinates out of bound");
        else if (data.type === "out_of_ocean")
          alert("coordinates out of ocean");
        else if (data.type === "offer_not_found") return 67;
        return 0;
      }

      await refreshOffers();
      return 2;
    } catch (err) {
      if (err?.statusCode === 401) {
        try {
          const { access } = await refreshAuth();
          await updateOffer(access, id, value);
          await refreshOffers();
          return 2;
        } catch (e) {
          console.error(e);
          await handleLogout();
        }
      } else {
        console.error(err);
      }
    }
  };

  // ---------------- DELETE OFFER (FIXED) ----------------

  const handleDeleteOffer = async (id) => {
    try {
      if (!profile?.uuid || !token || !user) return;
      if (!id) {
        alert("lawde");
      }

      const data = await deleteOffer(token, id);
      if (!data.success) {
        if (data.type === "offer_not_found") return 67;
        return 0;
      }

      await refreshOffers();
      return 3;
    } catch (err) {
      if (err?.statusCode === 401) {
        try {
          const { access } = await refreshAuth();

          const data = await deleteOffer(access, id); // ✅ FIXED

          if (!data.success) {
            if (data.type === "offer_not_found") return 67;
            return 0;
          }

          await refreshOffers();
          return 3;
        } catch (e) {
          console.error(e);
          await handleLogout();
        }
      } else {
        console.error(err);
      }
    }
  };

  // ---------------- RETURN ----------------

  return {
    lat,
    lng,
    services,
    setLat,
    setLng,
    setServices,

    profile,
    offers,
    requests,
    assignments,
    loading,

    refreshOffers,
    handleCreateOffer,
    handleUpdateOffer,
    handleDeleteOffer,
    handleLogout,
  };
}
