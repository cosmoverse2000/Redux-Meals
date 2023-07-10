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
        url: process.env.REACT_APP_FIREBASEAPI + "/meals.json",
      },
      ApplyDataFunc
    );
  }, [fetchData]);

  console.log("isloading:", isLoading);
  console.log("error", error);

  return <div></div>;
};

export default MealsData;
