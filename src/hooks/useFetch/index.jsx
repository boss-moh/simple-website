import { useState } from "react";

export function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  async function usefetch(url, options) {
    let tempObject = {};
    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      setIsLoading(false);
      setIsError(false);
      setData(data);
      tempObject = {
        data,
        isError: false,
        isLoading: false,
      };
    } catch (e) {
      setIsLoading(false);
      setIsError(e.message);
      tempObject = {
        data,
        isError: e.message,
        isLoading: false,
      };
    }
    return tempObject;
  }
  return { data, isError, isLoading, usefetch };
}

export default useFetch;