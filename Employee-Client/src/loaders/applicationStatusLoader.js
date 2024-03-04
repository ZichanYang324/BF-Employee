import customFetch from "../utils/customFetch";

export const appicationStatusLoader = async () => {
  const response = await customFetch(`/profile/getProfileStatus`);
  const status = await response.json();
  console.log("status", status);
  return status;
}