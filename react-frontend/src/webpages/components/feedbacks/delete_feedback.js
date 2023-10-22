import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GET_SINGLE_FEEDBACK } from "../../apis/api";
import { useNavigate } from "react-router-dom";

const DeleteFeedback = ({ restaurantId, feedbackId }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(GET_SINGLE_FEEDBACK(feedbackId), {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.token,
        },
      });
      if (response.ok) {
        navigate(`/feedbacks?restaurant_id=${restaurantId}`);
      } else console.log(`Feedback Deletion Failed`);
    } catch {
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="deleteAdmin">
      <span onClick={handleDelete}>
        Delete Feedback
        <AiOutlineDelete className="icon" />
      </span>
    </div>
  );
};

export default DeleteFeedback;
