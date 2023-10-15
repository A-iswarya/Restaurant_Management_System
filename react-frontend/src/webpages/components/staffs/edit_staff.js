import React from "react";
import EditForm from "../form";

const EditStaff = () => {
  return (
    <div className="editAdmin">
      <h1>Edit Staff</h1>
      <EditForm edit={true} isStaff={true} />
    </div>
  );
};
export default EditStaff;
