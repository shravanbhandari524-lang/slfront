import { Routes, Route } from "react-router-dom";
import Login from "./login/Login.jsx";
import ProtectRoutes from "./components/ProtectRoutes.jsx";
import Ship from "./Ship/Ship.jsx";
import Vendor from "./Vendor/Vendor.jsx";
import Admin from "./admin/Admin.jsx";
import HomeRedirect from "./components/HomeRedirect.jsx";
import MapView from "./components/MapView.jsx";
import "leaflet/dist/leaflet.css";
function App() {
  const points = [
    { id: 1, lat: 12.9716, lng: 77.5946 },
    { id: 2, lat: 13.0827, lng: 80.2707 },
    { id: 3, lat: 17.385, lng: 78.4867 },
  ];
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />

        {/* FIX: no HomeRedirect wrapper on login */}
        <Route path="/login" element={<Login />} />

        {/* FIX: roles lowercase to match what DB/token actually has */}
        <Route
          path="/ship"
          element={
            <ProtectRoutes role="ship">
              <Ship />
            </ProtectRoutes>
          }
        />
        <Route
          path="/vendor"
          element={
            <ProtectRoutes role="vendor">
              <Vendor />
            </ProtectRoutes>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectRoutes role="admin">
              <Admin />
            </ProtectRoutes>
          }
        />
        <Route path="/lawda" element={<MapView points={points} />} />
      </Routes>
    </div>
  );
}

export default App;
