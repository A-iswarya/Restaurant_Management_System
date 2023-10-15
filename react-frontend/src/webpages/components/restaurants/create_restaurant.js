import React, { useState } from "react";
import { POST_RESTAURANT } from "../../apis/api";
import { useNavigate } from "react-router-dom";

const CreateRestaurant = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    email: "",
    phoneNumber: "",
  });

  const validateInputes = () => {
    if (!/^[0-9]*$/.test(formData.phoneNumber)) {
      setError("Invalid Phone Number");
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
      const response = await fetch(POST_RESTAURANT, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        navigate(`/admin/create?restaurant_id=${responseData.data.id}`);
      } else setError("Restaurant Creation Failed!");
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
    <div className="addRestaurant">
      <h1>Add Restaurant</h1>
      {error && <div className="error">Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:<span>*</span>
        </label>
        <input
          value={formData.name}
          type="text"
          onChange={handleChange}
          name="name"
          required
        />
        <br />
        <label>City: </label>
        <input
          value={formData.city}
          type="text"
          onChange={handleChange}
          name="city"
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
        <button>Create</button>
      </form>
    </div>
  );
};
export default CreateRestaurant;
