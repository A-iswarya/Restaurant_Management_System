import React from "react";
import AdminForm from "./adminForm";

const EditAdmin = () => {
  return (
    <div className="editAdmin">
      <h1>Edit Admin</h1>
      <AdminForm edit={true} />
    </div>
  );
};
export default EditAdmin;
