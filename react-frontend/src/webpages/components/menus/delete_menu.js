import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GET_SINGLE_MENU } from "../../apis/api";
import { useNavigate } from "react-router-dom";

const DeleteMenu = ({ adminId, restaurantId, menuId }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(GET_SINGLE_MENU(menuId), {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.token,
        },
      });
      if (response.ok) {
        navigate(
          `/menus?admin_id=${adminId.current}&restaurant_id=${restaurantId.current}`
        );
      } else console.log(`Menu Deletion Failed`);
    } catch {
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="deleteAdmin">
      <span onClick={handleDelete}>
        Delete Menu
        <AiOutlineDelete className="icon" />
      </span>
    </div>
  );
};

export default DeleteMenu;
