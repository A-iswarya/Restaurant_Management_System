import React, { useEffect, useRef, useState } from "react";
import {
  POST_ADMIN,
  GET_SINGLE_ADMIN,
  GET_STAFFS,
  GET_SINGLE_STAFF,
} from "../apis/api";
import { GetIdFromUrl, loggingIn, getLocalStorageValue } from "../helper";
import { useNavigate } from "react-router-dom";
import DeleteAdmin from "./admins/delete_admin";

const Form = ({ edit, isAdmin, isStaff }) => {
  const submitApi = () => {
    if (isStaff) {
      if (edit) {
        return GET_SINGLE_STAFF(userId);
      } else {
        return GET_STAFFS(restaurantId.current);
      }
    } else if (isAdmin) {
      if (edit) {
        return GET_SINGLE_ADMIN(userId);
      } else {
        return POST_ADMIN;
      }
    }
  };

  const fetchApi = () => {
    if (isStaff) {
      return GET_SINGLE_STAFF(userId);
    } else if (isAdmin) {
      return GET_SINGLE_ADMIN(userId);
    }
  };

  const userId = getLocalStorageValue("user_id");
  const submitHttpCode = edit ? "PATCH" : "POST";
  const navigate = useNavigate();
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone_number: "",
    restaurant_id: restaurantId.current,
    ...(isStaff ? { name: "" } : {}),
    ...(isStaff ? { designation: "waitstaff" } : {}),
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(fetchApi(), {
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
            username: data.username,
            email: data.email,
            phone_number: data.phone_number,
            name: data,
            ...(isStaff ? { name: data.name } : ""),
            ...(isStaff ? { designation: data.designation } : ""),
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
      const response = await fetch(submitApi(), {
        method: submitHttpCode,
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.token,
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        if (isAdmin) {
          if (!edit) {
            loggingIn(responseData);
          }
          navigate(
            `/dashboard?restaurant_id=${restaurantId.current}&admin_id=${responseData.data.id}`
          );
        } else if (isStaff) {
          navigate(
            `/dashboard?restaurant_id=${restaurantId.current}&admin_id=${userId}`
          );
        }
      } else setError(`Admin ${edit ? "Updation" : "Creation"} Failed`);
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
    <div>
      {error && <div className="error">{error.message}</div>}
      <form onSubmit={handleSubmit}>
        {isStaff && (
          <>
            <label>Name: {edit ? "" : <span>*</span>}</label>
            <input
              value={formData.name}
              type="text"
              onChange={handleChange}
              name="name"
              required={!edit}
            />
            <br />
          </>
        )}
        <label>Username: {edit ? "" : <span>*</span>}</label>
        <input
          value={formData.username}
          type="text"
          onChange={handleChange}
          name="username"
          required={!edit}
        />
        <br />
        {isStaff && (
          <>
            {" "}
            <label>Designation:</label>
            <select
              value={formData.designation}
              onChange={handleChange}
              name="designation"
            >
              <option value="waitstaff">Waitstaff</option>
              <option value="chef">Chef</option>
            </select>
            <br />
          </>
        )}
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
        <button>{edit ? "EDIT" : "Create"}</button>
        {edit && <DeleteAdmin userId={userId} />}
      </form>
    </div>
  );
};

export default Form;
