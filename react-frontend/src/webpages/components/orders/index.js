import React, { useEffect, useState, useRef } from "react";
import Layout from "../../layout";
import { GET_ORDERS } from "../../apis/api";
import { useNavigate, Link } from "react-router-dom";
import { GetIdFromUrl, capitalizeFirstLetters } from "../../helper";

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

  const calculateTotal = (order) => {
    let total = 0;
    order.menus.forEach((menu) => (total += menu.quantity * menu.price));
    return total;
  };
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
                <th>Status</th>
                <th>Total</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {order.menus.map((menu, index) => (
                      <div key={index}>
                        {capitalizeFirstLetters(menu.name)}
                        <span className="orderQuantity">[{menu.quantity}]</span>
                      </div>
                    ))}
                  </td>
                  <td>
                    {order.tables.map((table, index) => (
                      <div key={index}>{table.table_number}</div>
                    ))}
                  </td>
                  <td>{capitalizeFirstLetters(order.order.status)}</td>
                  <td>{calculateTotal(order)}</td>
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
