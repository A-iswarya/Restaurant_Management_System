import React from "react";
import EditForm from "./feedback_form";

const EditFeedback = () => {
  return (
    <div className="editAdmin">
      <h1>Edit Feedback</h1>
      <EditForm edit={true} />
    </div>
  );
};

export default EditFeedback;
