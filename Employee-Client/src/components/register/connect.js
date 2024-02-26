import useFetch from "../../utils/useFetch";
export const Connect = (username,email,password) => {
    const { data, isLoading, error, isFetched } = useFetch("/user", {
        method: "POST",
        // headers: { Authorization: `Bearer ${token}`},
        body: { username:username, password:password, email:email},
      });
    return {
        data,
        isLoading,
        error,
        isFetched
    }
}