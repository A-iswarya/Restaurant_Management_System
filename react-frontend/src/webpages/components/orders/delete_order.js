import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GET_SINGLE_ORDER } from "../../apis/api";
import { useNavigate } from "react-router-dom";

const DeleteOrder = ({ restaurantId, orderId }) => {
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(GET_SINGLE_ORDER(orderId), {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.token,
        },
      });
      if (response.ok) {
        navigate(`/orders?restaurant_id=${restaurantId}`);
      } else console.log(`Order Deletion Failed`);
    } catch {
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="deleteAdmin">
      <span onClick={handleDelete}>
        Delete Order
        <AiOutlineDelete className="icon" />
      </span>
    </div>
  );
};

export default DeleteOrder;
