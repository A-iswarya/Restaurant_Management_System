import { useLocation } from "react-router-dom";

export const GetRestaurantId = function () {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get("restaurant_id");
};

export const loggingIn = (responseData) => {
  localStorage.setItem("user_id", JSON.stringify(responseData.data.id));
  localStorage.setItem("user_type", JSON.stringify(responseData.user_type));
  localStorage.setItem("token", JSON.stringify(responseData.token));
  localStorage.setItem("expiry_time", JSON.stringify(responseData.expiry_time));
};
