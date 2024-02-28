import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login";
import { Register } from "./components/register";
import Dashboard from "./pages/dashboard";
import Info from "./pages/info";
import Onboard from "./pages/onboard";
import ProtectedRoute from "./pages/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="info" element={<Info />} />
        <Route path="onboard" element={<Onboard />} />
      </Routes>
    </BrowserRouter>)
}

export default App;
