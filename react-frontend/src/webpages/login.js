import React from "react";
import { GetRestaurantId } from "./helper";
const Login = () => {
  const restaurantId = GetRestaurantId();
  return <h1>Hey {restaurantId}</h1>;
};
export default Login;
