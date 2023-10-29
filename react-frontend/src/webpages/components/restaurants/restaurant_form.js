import React, { useState, useEffect } from "react";
import { GET_RESTAURANTS, GET_SINGLE_RESTAURANT } from "../../apis/api";
import { useNavigate, useParams } from "react-router-dom";
import DeleteRestaurant from "./delete_restaurant";

const RestaurantForm = ({ edit }) => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const submitHttpCode = edit ? "PATCH" : "POST";
  const submitApi = edit
    ? GET_SINGLE_RESTAURANT(restaurantId)
    : GET_RESTAURANTS;

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GET_SINGLE_RESTAURANT(restaurantId), {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: localStorage.token,
          },
        });
        const data = await response.json();
        setFormData({
          ...formData,
          ...{
            name: data.name,
            city: data.city,
            email: data.email,
            phone_number: data.phone_number,
          },
        });
      } catch (error) {
        setError(error);
      }
    }
    if (edit) {
      fetchData();
    }
  }, []);

  const validateInputes = () => {
    if (!/^[0-9]*$/.test(formData.phone_number)) {
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
      const response = await fetch(submitApi, {
        method: submitHttpCode,
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        navigate(`/admin/create?restaurant_id=${responseData.data.id}`);
      } else setError(`Restaurant ${edit ? "Updation" : "Creation"} Failed!`);
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
    <>
      {error && <div className="error">Error: {error.message}</div>}
      <form onSubmit={handleSubmit}>
        <label>Name: {edit ? "" : <span>*</span>}</label>
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
          value={formData.phone_number}
          type="text"
          onChange={handleChange}
          name="phone_number"
        />
        <br />
        <button>{edit ? "EDIT" : "Create"}</button>
      </form>
      {edit && <DeleteRestaurant restaurantId={restaurantId} />}
    </>
  );
};

export default RestaurantForm;
