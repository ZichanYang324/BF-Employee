import { Housing } from "./components/housing";
import { Login } from "./components/login";
import ResponsiveAppBar from "./components/navbar";
import { Register } from "./components/register";
import { Report } from "./components/reports";
import VisaStatusManagement from "./components/visa";
import Info from "./pages/info";
import Onboarding from "./pages/onboarding";
import ProtectedRoute from "./pages/protectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import appicationStatusLoader from "./loaders/onboardLoader.js";


const ProtectedRoutes = () => {
  return (
    <ProtectedRoute>
      <ResponsiveAppBar />
      <Outlet />
    </ProtectedRoute>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: 'onboarding',
        element: <Onboarding />,
        loader: appicationStatusLoader
      },
      {
        path: "visa-status",
        element: <VisaStatusManagement />,
      },
      {
        path: "info",
        element: <Info />,
      },
      {
        path: "housing",
        element: <Housing />,
      },
      {
        path: "report",
        element: <Report />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App;
