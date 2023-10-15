import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GET_SINGLE_ADMIN } from "../../apis/api";
import { useNavigate } from "react-router-dom";
import { loggingOut } from "../../helper";

const DeleteAdmin = ({ userId }) => {
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(GET_SINGLE_ADMIN(userId), {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.token,
        },
      });
      if (response.ok) {
        loggingOut();
        navigate("/");
      } else console.log(`Admin Deletion Failed`);
    } catch {
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="deleteAdmin">
      <span onClick={handleDelete}>
        Delete Your Account
        <AiOutlineDelete className="icon" />
      </span>
    </div>
  );
};

export default DeleteAdmin;
