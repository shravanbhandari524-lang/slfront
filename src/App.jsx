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
        <Route path="/" element={<HomeRedirect></HomeRedirect>} />
        <Route
          path="/login"
          element={
            <HomeRedirect>
              <Login />
            </HomeRedirect>
          }
        />
        <Route
          path="/ship"
          element={
            <ProtectRoutes role="Ship">
              <Ship />
            </ProtectRoutes>
          }
        />
        <Route
          path="/vendor"
          element={
            <ProtectRoutes role="Vendor">
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
