import { Routes, Route } from "react-router-dom";
import Login from "./login/Login.jsx";
import ProtectRoutes from "./components/ProtectRoutes.jsx";
import Ship from "./Ship/Ship.jsx";
import Vendor from "./Vendor/Vendor.jsx";
import Admin from "./admin/Admin.jsx";
import HomeRedirect from "./components/HomeRedirect.jsx";

function App() {
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
      </Routes>
    </div>
  );
}

export default App;
