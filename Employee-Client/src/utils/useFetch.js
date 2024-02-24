import { useCallback, useEffect, useRef, useState } from "react";

/**
 * @typedef {Object} UseFetchOptions
 * @property {('GET'|'POST'|'PUT'|'PATCH'|'DELETE')} [method]
 * @property {Object.<string, string>} [headers]
 * @property {BodyInit|null} [body]
 */

/**
 * @typedef {Object} UseFetchState
 * @property {any|null} data
 * @property {boolean} isLoading
 * @property {Error|null} error
 * @property {boolean} isFetched
 */

/**
 * @template T
 * @param {string} url
 * @param {UseFetchOptions} [options]
 * @returns {UseFetchState<T>}
 */

const BASE_URL = "http://localhost:3100";

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFetched, setIsFetched] = useState(false);

  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: optionsRef.current?.method || "GET",
        headers: optionsRef.current?.headers,
        body: optionsRef.current?.body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        // TODO: response according to status code
      }

      const responseData = await response.json();
      setData(responseData);
      setIsFetched(true);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    let didCancel = false;

    const doFetch = async () => {
      if (!didCancel) {
        await fetchData();
      }
    };

    doFetch();

    return () => {
      didCancel = true;
    };
  }, [fetchData]);

  return { data, isLoading, error, isFetched };
}
