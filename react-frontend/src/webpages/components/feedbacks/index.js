import React, { useRef, useEffect, useState } from "react";
import Layout from "../../layout";
import { BiPencil } from "react-icons/bi";
import { Link } from "react-router-dom";
import { GetIdFromUrl } from "../../helper";
import { GET_FEEDBACKS } from "../../apis/api";

const Feedbacks = () => {
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GET_FEEDBACKS, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: localStorage.token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFeedbackData(data);
          setIsLoaded(true);
        } else {
          setError("Failed to fetch Feedback data.");
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="add-feedback-container">
        <Link to={`/feedbacks/create?restaurant_id=${restaurantId.current}`}>
          <button className="add-feedback">Add Feedback</button>
        </Link>
      </div>
      <div className="feedback-container">
        {error && <div className="error">{error.message}</div>}
        {isLoaded &&
          feedbackData.map((feedback, index) => (
            <div className="feedback">
              <div className="feedback-edit">
                <BiPencil />
              </div>
              <font className="feedback-text">
                {feedback.text.length > 80 ? (
                  <>
                    {feedback.text.substring(0, 79)}...
                    <span>Read More</span>
                  </>
                ) : (
                  feedback.text
                )}
              </font>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Feedbacks;
