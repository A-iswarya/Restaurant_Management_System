import React, { useEffect, useState, useRef } from "react";
import {
  GET_SINGLE_ORDER,
  GET_ORDERS,
  GET_TABLES,
  GET_MENUS,
} from "../../apis/api";

import { GetIdFromUrl, getLocalStorageValue } from "../../helper";
import { useNavigate, useParams } from "react-router-dom";

const OrderForm = ({ edit }) => {
  const { orderId } = useParams();
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));
  const navigate = useNavigate();
  const submitHttpCode = edit ? "PATCH" : "POST";
  const submitApi = edit ? GET_SINGLE_ORDER(orderId) : GET_ORDERS;
  const [error, setError] = useState("");
  const [formData, setFormData] = useState();
  const [tableOption, setTableOption] = useState([]);
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GET_SINGLE_ORDER(orderId), {
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
            data,
          },
        });
      } catch (error) {
        setError(error);
      }
    }
    async function fetchTables() {
      try {
        const response = await fetch(
          `${GET_TABLES}?restauranu_id=${restaurantId.current}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: localStorage.token,
            },
          }
        );
        const data = await response.json();
        setTableOption(data);
      } catch (error) {
        setError(error);
      }
    }
    fetchTables();

    async function fetchMenuData() {
      try {
        const response = await fetch(GET_MENUS, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: localStorage.token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMenuData(data);
        } else {
          setError("Failed to fetch menu data.");
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchMenuData();
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
        navigate("/orders");
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
        <br />
        <button>{edit ? "EDIT" : "Create"}</button>
      </form>
      {/* {edit && (
        <DeleteMenu restaurantId={restaurantId.current} menuId={menuId} />
      )} */}
    </div>
  );
};

export default OrderForm;
