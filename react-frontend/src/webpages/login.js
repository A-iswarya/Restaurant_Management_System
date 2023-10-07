import React from "react";
import { useParams } from "react-router-dom";
const Login = () => {
  const {restaurantId} = useParams();
  return(
    <h1>Hey {restaurantId}</h1>
  )
}
export default Login;