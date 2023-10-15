import React from "react";
import CustomerForm from "../form";

const CreateCustomer = () => {
  return (
    <div className="addStaff">
      <h1>Add Customer</h1>
      <CustomerForm isCustomer={true} />
    </div>
  );
};
export default CreateCustomer;
