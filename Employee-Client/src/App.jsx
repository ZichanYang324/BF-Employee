import { Housing } from "./components/housing";
import { Login } from "./components/login";
import ResponsiveAppBar from "./components/navbar";
import { Register } from "./components/register";
import { Report } from "./components/reports";
import VisaStatusManagement from "./components/visa";
import Info from "./pages/info";
import Onboard from "./pages/onboard";
import ProtectedRoute from "./pages/protectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";

function App() {
  // const user = useSelector((store) => store.user).user
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ResponsiveAppBar />
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<Onboard />} />
          <Route path="visa-status" element={<VisaStatusManagement />} />
          <Route path="info" element={<Info />} />
          <Route path="housing" element={<Housing />} />
          <Route path="report" element={<Report />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
