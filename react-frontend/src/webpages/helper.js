import { useLocation } from "react-router-dom";

export const GetRestaurantId = function () {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get("restaurant_id");
};
