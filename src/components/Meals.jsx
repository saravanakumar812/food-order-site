// import { useState, useEffect } from "react";
import MealItem from "./Mealtem";
import useHook from "../hooks/useHook";
import Error from "../components/Error";
const requestData = {};
export default function Meals() {
  // const [mealFetch, setMealFetch] = useState([]);
  // useEffect(() => {
  //   async function fetchMeals() {
  //     const response = await fetch("http://localhost:3000/meals");
  //     if (!response.ok) {
  //       // ...
  //     }
  //     const responseFData = await response.json();
  //     setMealFetch(responseFData);
  //   }
  //   fetchMeals();
  // }, []);
  const {
    data: mealFetch,
    isLoading,
    error
  } = useHook("http://localhost:3000/meals", requestData, []);
  if (isLoading) {
    return <p className="center">Fetching Data ....</p>;
  }
  if (error) {
    return <Error title="Fetching Fail to data.." message={error} />;
  }
  return (
    <ul id="meals">
      {mealFetch.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
