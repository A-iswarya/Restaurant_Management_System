import React from "react";
import EditForm from "../form";

const EditAdmin = () => {
  return (
    <div className="editAdmin">
      <h1>Edit Admin</h1>
      <EditForm edit={true} isAdmin={true} />
    </div>
  );
};
export default EditAdmin;
