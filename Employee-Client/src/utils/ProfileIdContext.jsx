// Inside a React component or context
import React, { useState, useEffect } from "react";
import customFetch from "./customFetch";

const ProfileIdContext = React.createContext();

export const ProfileIdProvider = ({ children }) => {
  const [profileId, setProfileId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProfileId = async () => {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("user"));
      const res = await customFetch.post("housing/getProfileId", {
        userId: token._id,
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
