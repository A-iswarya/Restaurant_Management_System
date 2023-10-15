import React from "react";
import EditForm from "../form";

const EditCustomer = () => {
  return (
    <div className="editAdmin">
      <h1>Edit Customer</h1>
      <EditForm edit={true} isCustomer={true} />
    </div>
  );
};
export default EditCustomer;
