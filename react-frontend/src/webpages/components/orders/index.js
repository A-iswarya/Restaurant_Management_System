import React, { useEffect, useState, useRef } from "react";
import Layout from "../../layout";
import { GET_ORDERS, POST_ORDER_UPDATE_STATUS } from "../../apis/api";
import { useNavigate, Link } from "react-router-dom";
import { GetIdFromUrl, capitalizeFirstLetters } from "../../helper";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));
  const updateStatus = useRef(GetIdFromUrl("update_status"));

  const statusMapping = {
    placed: "Placed",
    in_progress: "In Progress",
    ready_for_pickup: "Ready for Pickup",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
  };

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
          setOrderStatusData(
            data.map((order) => ({
              id: order.order.id,
              status: order.order.status,
            }))
          );
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

  const handleStatusChange = (e, orderId) => {
    const value = e.target.value;

    const updatedOrderStatusData = orderStatusData.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: value };
      }
      return order;
    });
    setOrderStatusData(updatedOrderStatusData);
    console.log(updatedOrderStatusData);
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      const response = await fetch(POST_ORDER_UPDATE_STATUS(orderId), {
        method: "POST",
        body: JSON.stringify(
          orderStatusData.find((status) => status.id === orderId)
        ),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.token,
        },
      });
      if (response.ok) {
        navigate(
          `/orders?restaurant_id=${restaurantId.current}?update_status=true`
        );
      } else setError("Status updation failed");
    } catch {
      setError("Something went wrong!");
    }
  };
  return (
    <Layout>
      <div className="staffs-container">
        <h1>
          {updateStatus.current ? "Update Order Status" : "Manage Orders"}
        </h1>
        {updateStatus.current ? null : (
          <button className="add-staff-button" onClick={handleAddButtonClick}>
            Add Order
          </button>
        )}
        {error && <div className="error">{error.message}</div>}
        {isLoaded && orderData.length !== 0 && (
          <table className="staff-table">
            <thead>
              <tr>
                <th>Number</th>
                <th>Menus</th>
                <th>Tables</th>
                <th>Status</th>
                {!updateStatus.current ? <th>Total</th> : null}
                <th>{updateStatus.current ? "Save" : "Edit"}</th>
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
                  <td>
                    {!updateStatus.current ? (
                      statusMapping[order.order.status]
                    ) : (
                      <select
                        value={
                          orderStatusData.find(
                            (orderData) => orderData.id === order.order.id
                          ).status
                        }
                        onChange={(e) => {
                          handleStatusChange(e, order.order.id);
                        }}
                        name={order.order.id}
                      >
                        {Object.keys(statusMapping).map((key) => (
                          <option key={key} value={key}>
                            {statusMapping[key]}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  {!updateStatus.current ? (
                    <td>{calculateTotal(order)}</td>
                  ) : null}
                  <td>
                    {updateStatus.current ? (
                      <span
                        className="saveOrder"
                        onClick={(e) => handleUpdateStatus(order.order.id)}
                      >
                        Save
                      </span>
                    ) : (
                      <Link
                        to={`/orders/${order.order.id}/edit?restaurant_id=${restaurantId.current}`}
                      >
                        Edit
                      </Link>
                    )}
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
