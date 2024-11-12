import { useEffect, useState, useCallback } from "react";
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Fetch Details not Found ");
  }
  return resData;
}

export default function useHook(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  function clearData() {
    setData(initialData);
  }
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const customerData = await sendHttpRequest(url, {
          ...config,
          body: data
        });
        setData(customerData);
      } catch (error) {
        setError(error.message || "Something went Wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );
  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return { data, error, isLoading, sendRequest, clearData };
}