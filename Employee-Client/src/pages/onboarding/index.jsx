import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Application from "./Application";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../../features/info/infoSlice";
import useFetch from "../../utils/useFetch";
import { usePrevious } from "react-use";
import { fetchDocuments } from "../../features/info/infoSlice";


const Onboarding = () => {

  const { status } = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.info.profile.data);
  const profileStatus = useSelector((store) => store.info.profile.status);
  const prevProfileStatus = usePrevious(profileStatus);
  const documents = useSelector((store) => store.info.documents.data);
  const documentsStatus = useSelector((store) => store.info.documents.status);

  useEffect(() => {
    if (status === "APPROVED") {
      navigate("/info")
    } 
  }, [status]);

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile());
    }
    console.log(profile)
  }, [profileStatus, dispatch]);

  // useEffect(() => {
  //   if (documentsStatus === "idle") {
  //     dispatch(fetchDocuments());
  //   }
  //   console.log(documents)
  // }, [documentsStatus, dispatch]);

  if (profileStatus !== "succeeded" && prevProfileStatus === "idle") {
    return <div>Loading...</div>;
  }

  switch (status) {
    case "NOT_STARTED":
      return <Application />;
    case "PENDING":
      return <Application pending={true} profile={profile}/>;
    case "REJECTED":
      return <Application rejected={true} profile={profile} />;
    default:
      return <Application />;
  }
}

export default Onboarding;
