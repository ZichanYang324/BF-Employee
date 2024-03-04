import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Onboarding = () => {
  
  const [status, setStatus] = useState("NOT_STARTED");
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
  })
  
  return (
    <div>index</div>
  )
}
