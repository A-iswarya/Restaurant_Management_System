import React, { useEffect, useState, useRef } from "react";
import Layout from "../../layout";
import { GET_ORDERS } from "../../apis/api";
import { useNavigate, Link } from "react-router-dom";
import { GetIdFromUrl } from "../../helper";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));

  const handleAddButtonClick = () => {
    navigate(`/orders/create?restaurant_id=${restaurantId.current}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GET_ORDERS, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: localStorage.token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setOrderData(data);
          setIsLoaded(true);
        } else {
          setError("Failed to fetch order data.");
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="staffs-container">
        <h1>Manage Orders</h1>
        <button className="add-staff-button" onClick={handleAddButtonClick}>
          Add Order
        </button>
        {error && <div className="error">{error.message}</div>}
        {isLoaded && orderData.length !== 0 && (
          <table className="staff-table">
            <thead>
              <tr>
                <th>Number</th>
                <th>Menus</th>
                <th>Tables</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.menus.map((menu) => `${menu.name}\n`)}</td>
                  <td>
                    {order.tables.map((table) => `${table.table_number}\n`)}
                  </td>
                  <td>
                    <Link to={`/orders/${order.order.id}/edit`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default Orders;