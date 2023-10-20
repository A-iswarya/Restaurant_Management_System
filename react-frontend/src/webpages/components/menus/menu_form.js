import React, { useEffect, useRef, useState } from "react";
import { GET_SINGLE_MENU, GET_MENUS, GET_STAFFS } from "../../apis/api";

import { GetIdFromUrl, getLocalStorageValue } from "../../helper";
import { useNavigate, useParams } from "react-router-dom";
import DeleteMenu from "./delete_menu";

const MenuForm = ({ edit }) => {
  const adminId = getLocalStorageValue("user_id");
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));
  const { menuId } = useParams();
  const navigate = useNavigate();
  const submitHttpCode = edit ? "PATCH" : "POST";
  const submitApi = edit ? GET_SINGLE_MENU(menuId) : GET_MENUS;
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cooking_time: "",
    price: "",
    staff_id: "",
    admin_id: adminId,
  });
  const [staffOptions, setStaffOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GET_SINGLE_MENU(menuId), {
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
            description: data.description,
            cooking_time: data.cooking_time,
            price: data.price,
            staff_id: data.staff_id,
          },
        });
      } catch (error) {
        setError(error);
      }
    }
    async function fetchStaff() {
      try {
        const response = await fetch(
          `${GET_STAFFS(restaurantId.current)}&chef=true`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: localStorage.token,
            },
          }
        );
        const data = await response.json();
        setStaffOptions(data);
      } catch (error) {
        setError(error);
      }
    }
    fetchStaff();
    if (edit) {
      fetchData();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(submitApi, {
        method: submitHttpCode,
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.token,
        },
      });
      if (response.ok) {
        navigate(`/menus?restaurant_id=${restaurantId.current}`);
      } else setError(`Menu ${edit ? "Updation" : "Creation"} Failed`);
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
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Name: {edit ? "" : <span>*</span>}</label>
        <input
          value={formData.name}
          type="text"
          onChange={handleChange}
          name="name"
          required={!edit}
        />
        <br />
        <label>Description: </label>
        <textarea
          value={formData.description}
          type="text"
          onChange={handleChange}
          name="description"
        />
        <br />

        <label>Cooking Time: </label>
        <input
          value={formData.cooking_time}
          type="text"
          onChange={handleChange}
          name="cooking_time"
        />
        <br />
        <label>Price: </label>
        <input
          value={formData.price}
          type="text"
          onChange={handleChange}
          name="price"
        />
        <br />
        <label>Staff:</label>
        <select
          value={formData.staff_id}
          onChange={handleChange}
          name="staff_id"
        >
          <option value="">Select a Staff Member</option>
          {staffOptions &&
            staffOptions.map((staff) => (
              <option
                key={`${staff.id}`}
                value={`${staff.id}`}
              >{`${staff.name.toUpperCase()}`}</option>
            ))}
        </select>
        <br />
        <button>{edit ? "EDIT" : "Create"}</button>
      </form>
      {edit && <DeleteMenu restaurantId={restaurantId} menuId={menuId} />}
    </div>
  );
};

export default MenuForm;
