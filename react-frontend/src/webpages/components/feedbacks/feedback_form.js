import React, { useEffect, useRef, useState } from "react";
import { GET_FEEDBACKS, GET_SINGLE_FEEDBACK } from "../../apis/api";

import { GetIdFromUrl, getLocalStorageValue } from "../../helper";
import { useNavigate, useParams } from "react-router-dom";
import DeleteFeedback from "./delete_feedback";

const FeedbackForm = ({ edit }) => {
  const userId = getLocalStorageValue("user_id");
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));
  const navigate = useNavigate();
  const { feedbackId } = useParams();
  const submitHttpCode = edit ? "PATCH" : "POST";
  const submitApi = edit ? GET_SINGLE_FEEDBACK(feedbackId) : GET_FEEDBACKS;
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    text: "",
    customer_id: userId,
    restaurant_id: restaurantId.current,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GET_SINGLE_FEEDBACK(feedbackId), {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: localStorage.token,
          },
        });
        const data = await response.json();
        setFormData({
          ...formData,
          ...{
            text: data.text,
          },
        });
      } catch (error) {
        setError(error);
      }
    }
    if (edit) {
      fetchData();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(submitApi, {
        method: submitHttpCode,
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.token,
        },
      });
      if (response.ok) {
        navigate(`/feedbacks?restaurant_id=${restaurantId.current}`);
      } else setError(`Feedback ${edit ? "Edit" : "Creation"} Failed`);
    } catch {
      setError("Something went wrong!");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <textarea
          className="feedback-textarea"
          value={formData.text}
          type="text"
          onChange={handleChange}
          name="text"
        />
        <br />
        <button>{edit ? "EDIT" : "Add"}</button>
      </form>
      {edit && (
        <DeleteFeedback
          restaurantId={restaurantId.current}
          feedbackId={feedbackId}
        />
      )}
    </div>
  );
};

export default FeedbackForm;
