import { useLocation } from "react-router-dom";

export const GetIdFromUrl = (key) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(key);
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

export const capitalizeFirstLetters = (str) => {
  return str
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string
};
