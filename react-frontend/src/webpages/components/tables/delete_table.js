import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GET_SINGLE_TABLE } from "../../apis/api";
import { useNavigate } from "react-router-dom";

const DeleteTable = ({ restaurantId, tableId }) => {
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(GET_SINGLE_TABLE(tableId), {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.token,
        },
      });
      if (response.ok) {
        navigate(`/tables?restaurant_id=${restaurantId}`);
      } else console.log(`Table Deletion Failed`);
    } catch {
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="deleteAdmin">
      <span onClick={handleDelete}>
        Delete Table
        <AiOutlineDelete className="icon" />
      </span>
    </div>
  );
};

export default DeleteTable;
