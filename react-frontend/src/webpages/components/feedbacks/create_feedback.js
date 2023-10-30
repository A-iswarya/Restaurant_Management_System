import React from "react";
import FeedbackForm from "./feedback_form";
import Layout from "../../layout";

const CreateFeedback = () => {
  return (
    <Layout>
      <div className="addFeedback">
        <h1>Add Feedback</h1>
        <FeedbackForm />
      </div>
    </Layout>
  );
};
export default CreateFeedback;
