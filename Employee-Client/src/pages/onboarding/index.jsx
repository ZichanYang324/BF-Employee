import { useLoaderData, useNavigate } from "react-router-dom";
import Application from "./Application";
import Pending from "./Pending";
import Rejected from "./Rejected";

const Onboarding = () => {
  
  const { status } = useLoaderData();
  const navigate = useNavigate();

  if (status === "APPROVED") {
    navigate("/info")
  }

  switch (status) {
    case "NOT_STARTED":
      return <Application pending={true}/>;
    case "PENDING":
      return <Pending />;
    case "REJECTED":
      return <Rejected />;
    default:
      return <Application />;
  }
}

export default Onboarding;
