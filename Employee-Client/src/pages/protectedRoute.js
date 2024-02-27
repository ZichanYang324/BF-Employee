import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    //if user do not exist
    if (!user) {
      navigate("/");
      return;
    }
  }, [user, navigate]);
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
