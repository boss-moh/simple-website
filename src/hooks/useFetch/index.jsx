import { useState } from "react";
import { Auth } from "../../util";

export function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  async function usefetch(
    url,
    method = "GET",
    data = "",
    type = "application/json"
  ) {
    const options = {
      method,
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    };

    method !== "GET" && (options.body = data);
    console.log(options);

    let tempObject = {};
    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      setIsLoading(false);
      setIsError(false);
      setData(data);
      tempObject = {
        response: data,
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
