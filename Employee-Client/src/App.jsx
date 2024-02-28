import { Housing } from "./components/housing";
import { Login } from "./components/login";
import { Register } from "./components/register";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./pages/protectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="housing"
          element={
            <ProtectedRoute>
              <Housing />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
