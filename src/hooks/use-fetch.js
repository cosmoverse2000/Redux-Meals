import { useCallback, useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (httpData, ApplyDataFunc) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(httpData.url, {
        method: httpData.method ? httpData.method : "GET",
        body: httpData.body ? JSON.stringify(httpData.body) : null,
        headers: httpData.headers ? httpData.headers : {},
      });

      if (!response.ok) {
        throw new Error("Request Failed");
      }

      const data = await response.json();

      ApplyDataFunc(data);
    } catch (error) {
      // console.log(error);
      setError(error.message || "Something went wrong");
    }
    setIsLoading(false);
  }, []);
  return { isLoading, error, fetchData };
};

export default useFetch;
