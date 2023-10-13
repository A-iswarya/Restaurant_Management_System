import { useLocation } from "react-router-dom";

export const GetRestaurantId = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get("restaurant_id");
};

export const loggingIn = (responseData) => {
  localStorage.setItem("user_id", JSON.stringify(responseData.data.id));
  localStorage.setItem("user_type", JSON.stringify(responseData.user_type));
  localStorage.setItem("token", JSON.stringify(responseData.token));
};

export const loggingOut = (responseData) => {
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_type");
  localStorage.removeItem("token");
};

export const getLocalStorageValue = (key) =>
  localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
