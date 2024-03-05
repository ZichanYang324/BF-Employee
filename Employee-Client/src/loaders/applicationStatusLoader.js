import customFetch from "../utils/customFetch";

const appicationStatusLoader = async () => {
  const response = await customFetch(`/profile/getProfileStatus`);
  const data = await response.data;
  return data;
}

export default appicationStatusLoader;