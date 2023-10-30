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

export const formatTime = (datetime) => {
  const date = new Date(datetime);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDate;
};
