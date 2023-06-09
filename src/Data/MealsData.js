import React, { useEffect } from "react";
import useFetch from "../hooks/use-fetch";

const MealsData = () => {
  const { isLoading, error, fetchData } = useFetch();

  const ApplyDataFunc = (data) => {
    console.log("data", data);
  };

  useEffect(() => {
    fetchData(
      {
        url: "https://react-http-db9a9-default-rtdb.firebaseio.com/meals.json",
      },
      ApplyDataFunc
    );
  }, [fetchData]);

  console.log("isloading:", isLoading);
  console.log("error", error);

  return <div></div>;
};

export default MealsData;
