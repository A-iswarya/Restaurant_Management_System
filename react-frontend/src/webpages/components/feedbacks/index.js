import React, { useRef, useEffect, useState } from "react";
import Layout from "../../layout";
import { BiPencil } from "react-icons/bi";
import { Link } from "react-router-dom";
import { GetIdFromUrl, getLocalStorageValue } from "../../helper";
import { GET_FEEDBACKS } from "../../apis/api";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Feedbacks = () => {
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));
  const userId = getLocalStorageValue("user_id");
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Create an array to track which modals are open
  const [openModals, setOpenModals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${GET_FEEDBACKS}?customer_id=${userId}`, {
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
          // Initialize the openModals array with the same length as feedbackData
          setOpenModals(Array(data.length).fill(false));
        } else {
          setError("Failed to fetch Feedback data.");
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);

  const handleReadMoreOpen = (index) => {
    // Open the modal for the corresponding feedback item
    const newOpenModals = [...openModals];
    newOpenModals[index] = true;
    setOpenModals(newOpenModals);
  };

  const handleReadMoreClose = (index) => {
    // Close the modal for the corresponding feedback item
    const newOpenModals = [...openModals];
    newOpenModals[index] = false;
    setOpenModals(newOpenModals);
  };

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
            <div className="feedback" key={index}>
              <Link
                to={`/feedbacks/${feedback.id}/edit?restaurant_id=${restaurantId.current}`}
              >
                <div className="feedback-edit">
                  <BiPencil />
                </div>
              </Link>
              <font className="feedback-text">
                {feedback.text.length > 80 ? (
                  <>
                    {feedback.text.substring(0, 79)}...
                    <span onClick={() => handleReadMoreOpen(index)}>
                      Read More
                    </span>
                    <Modal
                      open={openModals[index]}
                      onClose={() => handleReadMoreClose(index)}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 400,
                          bgcolor: "#fff",
                          border: "2px solid #000",
                          boxShadow: 24,
                          p: 4,
                        }}
                      >
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {feedback.text}
                        </Typography>
                      </Box>
                    </Modal>
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
