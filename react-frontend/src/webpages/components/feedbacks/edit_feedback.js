import React from "react";
import EditForm from "./feedback_form";
import Layout from "../../layout";

const EditFeedback = () => {
  return (
    <Layout>
      <div className="editAdmin">
        <h1>Edit Feedback</h1>
        <EditForm edit={true} />
      </div>
    </Layout>
  );
};

export default EditFeedback;
