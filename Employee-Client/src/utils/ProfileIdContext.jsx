// Inside a React component or context
import React, { useState, useEffect } from "react";
import customFetch from "./customFetch";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
const ProfileIdContext = React.createContext();

export const ProfileIdProvider = ({ children }) => {
  const [profileId, setProfileId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");
  useEffect(() => {
    const getProfileId = async () => {
      setIsLoading(true);
      const res = await customFetch.post("housing/getProfileId", {
        userId: jwtDecode(token).userId,
      });
      setProfileId(res.data);
      setIsLoading(false);
    };

    getProfileId();
  }, []);

  return (
    <ProfileIdContext.Provider value={{ profileId, isLoading }}>
      {children}
    </ProfileIdContext.Provider>
  );
};
export default ProfileIdContext;
