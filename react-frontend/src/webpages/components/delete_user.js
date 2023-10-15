import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GET_SINGLE_ADMIN, GET_SINGLE_STAFF } from "../apis/api";
import { useNavigate } from "react-router-dom";
import { loggingOut } from "../helper";

const DeleteAdmin = (props) => {
  const navigate = useNavigate();
  const fetchApi = () => {
    if (props.isStaff) {
      return GET_SINGLE_STAFF(props.userId);
    } else if (props.isAdmin) {
      return GET_SINGLE_ADMIN(props.userId);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(fetchApi(), {
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
