import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login";
import { Register } from "./components/register";
import Dashboard from "./pages/dashboard";
import VisaStatusManagement from "./components/visa"; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="visa-status" element={<VisaStatusManagement />} /> 

      </Routes>
    </BrowserRouter>)
}

export default App;
