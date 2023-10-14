const API_DOMAIN = "http://localhost:3000/api/v1";

export const GET_RESTAURANTS = `${API_DOMAIN}/restaurants`;
export const POST_RESTAURANT = `${API_DOMAIN}/restaurants`;

export const POST_ADMIN = `${API_DOMAIN}/admins`;
export const GET_SINGLE_ADMIN = (userId) => `${API_DOMAIN}/admins/${userId}`;

export const GET_STAFFS = (restaurantId) =>
  `${API_DOMAIN}/staffs?restaurant_id=${restaurantId}`;
export const GET_SINGLE_STAFF = (staff_id) =>
  `${API_DOMAIN}/staffs/${staff_id}`;

export const LOGIN = (userType) =>
  `${API_DOMAIN}/${userType.toLowerCase()}s/login`;
