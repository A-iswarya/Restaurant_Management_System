import { useLocation } from "react-router-dom";

export const GetRestaurantId = function () {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get("restaurant_id");
};

// Function to set an item with an expiration date in localStorage
export const setItemWithExpiration = function (key, value, expirationDate) {
  const item = {
    value: value,
    expiration: new Date(expirationDate).getTime(), // Store expiration as a timestamp
  };
  localStorage.setItem(key, JSON.stringify(item));
};

// Function to get an item from localStorage and check if it has expired
export const getItemWithExpiration = function (key) {
  const item = localStorage.getItem(key);
  if (!item) {
    return null; // Item doesn't exist
  }

  const parsedItem = JSON.parse(item);
  const now = new Date().getTime();

  if (parsedItem.expiration && parsedItem.expiration <= now) {
    // Item has expired, remove it from localStorage
    localStorage.removeItem(key);
    return null;
  }

  return parsedItem.value;
};

export const loggingIn = (responseData) => {
  localStorage.setItem("user", JSON.stringify(responseData.data));
  localStorage.setItem("userType", JSON.stringify(responseData.user_type));
  setItemWithExpiration("token", responseData.token, responseData.expiry_date);
};
