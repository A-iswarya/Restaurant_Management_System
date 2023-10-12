import React, { useState, useRef } from "react";
import Layout from "./layout";
import { loggingIn, GetRestaurantId } from "../helper";
import { LOGIN } from "../apis/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const restaurantId = useRef(GetRestaurantId());
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    user_type: "Customer",
    restaurant_id: restaurantId.current,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(LOGIN(formData.user_type), {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        loggingIn(responseData);
        navigate(
          `/dashboard?restaurant_id=${restaurantId.current}&admin_id=${responseData.data.id}`
        );
      } else setError("Incorrect username/password");
    } catch {
      setError("Something went wrong!");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Layout>
      <div className="login-container">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="user-type-options">
            <label>
              <input
                type="radio"
                name="user_type"
                value="Customer"
                onChange={handleChange}
                defaultChecked
              />
              Customer
            </label>
            <label>
              <input
                type="radio"
                name="user_type"
                value="Staff"
                onChange={handleChange}
              />
              Staff
            </label>
            <label>
              <input
                type="radio"
                name="user_type"
                value="Admin"
                onChange={handleChange}
              />
              Admin
            </label>
          </div>
          <div className="password-options">
            <span className="forgot-password">Forgot Password?</span>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
