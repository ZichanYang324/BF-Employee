import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Housing } from "./components/housing";
import Dashboard from "./pages/dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="housing" element={<Housing />} />
      </Routes>
    </BrowserRouter>)
}

export default App;
