import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GET_SINGLE_RESTAURANT } from "../../apis/api";
import { useNavigate } from "react-router-dom";
import { loggingOut } from "../../helper";

const DeleteRestaurant = ({ restaurantId }) => {
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(GET_SINGLE_RESTAURANT(restaurantId), {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.token,
        },
      });
      if (response.ok) {
        loggingOut();
        navigate(`/`);
      } else console.log(`Restaurant Deletion Failed`);
    } catch {
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="deleteAdmin">
      <span onClick={handleDelete}>
        Delete Restaurant
        <AiOutlineDelete className="icon" />
      </span>
    </div>
  );
};

export default DeleteRestaurant;
