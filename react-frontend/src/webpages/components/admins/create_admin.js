import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_ADMINS } from "../../apis/api";
import { GetRestaurantId } from "../../helper";

const CreateAdmin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
    restaurant_id: GetRestaurantId(),
  });

  const validateInputes = () => {
    if (!/^[0-9]*$/.test(formData.phoneNumber)) {
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
      const response = await fetch(GET_ADMINS, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok) {
        //session
        navigate("/dashboard");
      } else setError("Admin Creation Failed!");
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
      {error && <div className="error">Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:<span>*</span>{" "}
        </label>
        <input
          value={formData.name}
          type="text"
          onChange={handleChange}
          name="name"
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
          value={formData.phoneNumber}
          type="text"
          onChange={handleChange}
          name="phoneNumber"
        />
        <br />
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
