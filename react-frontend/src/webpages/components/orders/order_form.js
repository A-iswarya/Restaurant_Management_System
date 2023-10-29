import React, { useEffect, useState, useRef } from "react";
import {
  GET_SINGLE_ORDER,
  GET_ORDERS,
  GET_TABLES,
  GET_MENUS,
} from "../../apis/api";

import {
  GetIdFromUrl,
  capitalizeFirstLetters,
  getLocalStorageValue,
} from "../../helper";
import { useNavigate, useParams } from "react-router-dom";
import DeleteOrder from "./delete_order";

const OrderForm = ({ edit }) => {
  const { orderId } = useParams();
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));
  const userId = getLocalStorageValue("user_id");
  const navigate = useNavigate();
  const submitHttpCode = edit ? "PATCH" : "POST";
  const submitApi = edit ? GET_SINGLE_ORDER(orderId) : GET_ORDERS;
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    tables: [],
    menus: [],
    staff_id: userId,
  });

  const [tableData, setTableData] = useState([]);
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
            tables: data.tables.map((table) => ({
              table_id: table.id,
            })),
          },
          ...{
            menus: data.menus.map((menu) => ({
              menu_id: menu.id,
              quantity: menu.quantity,
            })),
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
        setTableData(data);
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
    if (formData.tables.length === 0 || formData.menus.length === 0) {
      setError("Add Tables and Menus");
      return;
    }
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

  const calculateTotal = () => {
    let sum = 0;
    formData.menus.forEach((menu) => {
      const menuItem = menuData.find(
        (menuItem) => menuItem.id === menu.menu_id
      );
      if (!(menuItem.length === 0)) {
        sum += menu.quantity * menuItem.price;
      }
    });
    return sum;
  };

  const handleTableSelection = (e) => {
    const value = e.target.value;
    const updatedTables = [...formData.tables]; // Create a copy of the tables array
    const index = updatedTables.findIndex((table) => table.table_id === value);
    if (index !== -1) {
      // If the table is already selected, remove it
      updatedTables.splice(index, 1);
    } else {
      // If it's not selected, add it
      updatedTables.push({ table_id: value });
    }
    setFormData({ ...formData, tables: updatedTables });
  };

  const handleMenuSelection = (e) => {
    const { name, value } = e.target;
    const intValue = Number(value);
    const updatedMenus = [...formData.menus]; // Create a copy of the menus array
    const index = updatedMenus.findIndex((menu) => menu.menu_id === name);

    if (index !== -1) {
      if (value <= 0) updatedMenus.splice(index, 1);
      else updatedMenus[index].quantity = intValue;
    } else {
      if (value <= 0) return;
      else updatedMenus.push({ menu_id: name, quantity: intValue });
    }
    setFormData({ ...formData, menus: updatedMenus });
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="title">
          <label>Tables:</label>
        </div>
        <div className="tableSection">
          <div className="checkboxes">
            {tableData.map((table) => (
              <label key={table.id}>
                <input
                  type="checkbox"
                  id={table.id}
                  name="tableSelected"
                  value={table.id}
                  onChange={handleTableSelection}
                  checked={formData.tables.some(
                    (tableData) => tableData.table_id === table.id
                  )}
                />
                {table.table_number}
              </label>
            ))}
          </div>
        </div>
        <div className="title">
          <label>Menus:</label>
        </div>
        <div className="menuSection">
          <table className="fixed-size-table">
            <thead>
              <tr>
                <th></th>
                <th className="menuQuantity">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {menuData.map((menu) => (
                <tr key={menu.id}>
                  <td className="menuName">
                    {capitalizeFirstLetters(menu.name)}
                  </td>
                  <td className="menuQuantity">
                    <input
                      type="number"
                      name={menu.id}
                      value={
                        formData.menus.find((item) => item.menu_id === menu.id)
                          ?.quantity || ""
                      }
                      onChange={handleMenuSelection}
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <td className="menuName">Total</td>
                <td className="menuQuantity">
                  <span>{calculateTotal()}</span>
                </td>
              </tr>
            </tbody>
          </table>
          {/* <div className="checkboxes"></div> */}
        </div>

        <br />
        <button>{edit ? "EDIT" : "Create"}</button>
      </form>
      {edit && (
        <DeleteOrder restaurantId={restaurantId.current} orderId={orderId} />
      )}
    </div>
  );
};

export default OrderForm;
