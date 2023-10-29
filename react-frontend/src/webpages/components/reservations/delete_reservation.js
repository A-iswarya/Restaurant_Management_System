import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GET_SINGLE_RESERVATION } from "../../apis/api";
import { useNavigate } from "react-router-dom";

const DeleteReservation = ({ restaurantId, reservationId }) => {
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(GET_SINGLE_RESERVATION(reservationId), {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.token,
        },
      });
      if (response.ok) {
        navigate(`/reservations?restaurant_id=${restaurantId}`);
      } else console.log(`Reservation Deletion Failed`);
    } catch {
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="deleteAdmin">
      <span onClick={handleDelete}>
        Delete Reservation
        <AiOutlineDelete className="icon" />
      </span>
    </div>
  );
};

export default DeleteReservation;
