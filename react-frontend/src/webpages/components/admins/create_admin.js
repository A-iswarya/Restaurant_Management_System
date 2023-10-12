import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { POST_ADMIN } from "../../apis/api";
import { GetRestaurantId, loggingIn } from "../../helper";

const CreateAdmin = () => {
  const restaurantId = useRef(GetRestaurantId());
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone_number: "",
    restaurant_id: restaurantId.current,
  });

  const validateInputes = () => {
    if (!/^[0-9]*$/.test(formData.phone_number)) {
      setError("Invalid Phone Number");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Password doesn't match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputes()) {
      return;
    }
    try {
      const response = await fetch(POST_ADMIN, {
        method: "POST",
        body: JSON.stringify({ admin: formData }),
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
      } else setError("Admin Creation Failed");
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
    <div className="addAdmin">
      <h1>Add Admin</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Username: <span>*</span>
        </label>
        <input
          value={formData.username}
          type="text"
          onChange={handleChange}
          name="username"
          required
        />
        <br />
        <label>Email: </label>
        <input
          value={formData.email}
          type="email"
          onChange={handleChange}
          name="email"
        />
        <br />
        <label>Phone Number: </label>
        <input
          value={formData.phone_number}
          type="text"
          onChange={handleChange}
          name="phone_number"
        />
        <br />
        <label>
          Password: <span>*</span>
        </label>
        <input
          value={formData.password}
          type="password"
          onChange={handleChange}
          name="password"
          required
        />
        <br />
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <br />
        <button>Create</button>
      </form>
    </div>
  );
};
export default CreateAdmin;
