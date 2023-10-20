const API_DOMAIN = "http://localhost:3000/api/v1";

export const GET_RESTAURANTS = `${API_DOMAIN}/restaurants`;
export const POST_RESTAURANT = `${API_DOMAIN}/restaurants`;

export const POST_ADMIN = `${API_DOMAIN}/admins`;
export const GET_SINGLE_ADMIN = (userId) => `${API_DOMAIN}/admins/${userId}`;

export const GET_STAFFS = (restaurantId) =>
  `${API_DOMAIN}/staffs?restaurant_id=${restaurantId}`;
export const GET_SINGLE_STAFF = (staffId) => `${API_DOMAIN}/staffs/${staffId}`;

export const GET_CUSTOMERS = `${API_DOMAIN}/customers`;
export const GET_SINGLE_CUSTOMER = (customerId) =>
  `${API_DOMAIN}/customers/${customerId}`;

export const LOGIN = (userType) =>
  `${API_DOMAIN}/${userType.toLowerCase()}s/login`;

export const GET_MENUS = `${API_DOMAIN}/menus`;
export const GET_SINGLE_MENU = (menuId) => `${API_DOMAIN}/menus/${menuId}`;
