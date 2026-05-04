import { useState } from "react";
import DashboardLayout from "./DashboardLayout.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import OffersPage from "./pages/OffersPage.jsx";
import RequestsPage from "./pages/RequestsPage.jsx";
import AssignmentsPage from "./pages/AssignmentsPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import { useShipData } from "../hooks/useShipdata.js";
import { useToast } from "../components/ui/Toast.jsx";
import styles from "./Ship.module.css"; // We'll keep a tiny css file just in case

export default function Ship() {
  const {
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
    refreshOffers,
    handleCreateOffer,
    handleLogout,
    handleUpdateOffer,
    handleDeleteOffer,
  } = useShipData();

  const [activeTab, setActiveTab] = useState("profile");
  const toast = useToast();

  const onLogoutClick = async () => {
    await handleLogout();
    toast("Logged out successfully", "info");
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={onLogoutClick}
    >
      {activeTab === "profile" && <ProfilePage profile={profile} />}
      {activeTab === "offers" && (
        <OffersPage
          profile={profile}
          offers={offers}
          refreshOffers={refreshOffers}
          lat={lat}
          lng={lng}
          services={services}
          setLat={setLat}
          setLng={setLng}
          setServices={setServices}
          handleCreateOffer={handleCreateOffer}
          handleUpdateOffer={handleUpdateOffer}
          handleDeleteOffer={handleDeleteOffer}
        />
      )}
      {activeTab === "requests" && (
        <RequestsPage profile={profile} requests={requests} />
      )}
      {activeTab === "assignments" && (
        <AssignmentsPage assignments={assignments} />
      )}
      {activeTab === "map" && <MapPage offers={offers} />}
    </DashboardLayout>
  );
}
