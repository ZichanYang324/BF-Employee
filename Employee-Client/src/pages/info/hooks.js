import useFetch from "../../utils/useFetch";
import Cookies from "js-cookie";
import { useMemo } from "react";

export function useCustomFetch(url, _options) {
  const token = Cookies.get("token");
  const options = useMemo(() => {
    return {
      ..._options,
      headers: {
        ..._options?.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }, [_options, token]);

  const { data, isLoading, error, isFetched } = useFetch(url, options);
  return { data, isFetched: isLoading, error, isFetched };
}
