import React from "react";
import EditForm from "./order_form";

const EditOrder = () => {
  return (
    <div className="editAdmin">
      <h1>Edit Order</h1>
      <EditForm edit={true} />
    </div>
  );
};
export default EditOrder;
