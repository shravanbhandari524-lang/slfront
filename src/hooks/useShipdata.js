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
  const [requests, setRequests] = useState([]);
  const [assignments, setAssignments] = useState([]);
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

        const cachedOffers = localStorage.getItem("offers");

        if (cachedOffers) {
          setOffers(JSON.parse(cachedOffers));
        } else {
          const data = await getOffers(access, decoded.uuid);
          setOffers(data.data);
          localStorage.setItem("offers", JSON.stringify(data.data));
        }
      } catch (err) {
        if (err.statusCode == 401) {
          await handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [navigate, setToken]);

  const refreshOffers = async () => {
    try {
      if (!token || !user) return;

      const data = await getOffers(token, user.uuid);
      setOffers(data.data);
      localStorage.setItem("offers", JSON.stringify(data.data));
    } catch (err) {
      if (err.statusCode == 401) {
        const { access } = await refreshAccessToken();
        setToken(access);
        setLocalToken(access);

        const decoded = decodeToken(access);
        setUser(decoded);
        const data = await getOffers(access, decoded.uuid);
        setOffers(data.data);
        localStorage.setItem("offers", JSON.stringify(data.data));
      } else {
        await handleLogout();
      }
    }
  };
  const handleCreateOffer = async () => {
    try {
      if (!profile?.uuid) return;

      const value = {
        vessel_id: profile.uuid,
        lat: Number(lat),
        lng: Number(lng),
        services,
      };

      if (!token || !user) return;

      if (!value.lat || !value.lng || !value.services) {
        alert("fill all data in creating offer");
        return;
      }

      const data = await createOffer(token, value);

      if (!data.success) {
        alert("coordinates out of bound");
        return;
      }
      console.log(data.data[0]);
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
      ]); // await refreshOffers();

      setLat("");
      setLng("");
      setServices("");
    } catch (err) {
      if (err?.statusCode == 401) {
        const { access } = await refreshAccessToken();

        setToken(access);
        setLocalToken(access);

        const decoded = decodeToken(access);
        setUser(decoded);

        const value = {
          vessel_id: profile.uuid,
          lat: Number(lat),
          lng: Number(lng),
          services,
        };

        await createOffer(access, value);
        await refreshOffers();

        setLat("");
        setLng("");
        setServices("");
      } else {
        await handleLogout();
      }
    }
  };
  const handleUpdateOffer = async () => {
    try {
    } catch (err) {
      if (err.statusCode == 401) {
      }
    }
  };
  const handleLogout = async () => {
    try {
      console.log("hit");
      await logout();

      localStorage.clear();
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
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
    requests,
    assignments,
    loading,
    refreshOffers,
    handleCreateOffer,
    handleLogout,
  };
}
