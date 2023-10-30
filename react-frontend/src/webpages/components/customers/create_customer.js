import React from "react";
import CustomerForm from "../form";
import Layout from "../../layout";

const CreateCustomer = () => {
  return (
    <Layout>
      <div className="addStaff">
        <h1>Add Customer</h1>
        <CustomerForm isCustomer={true} />
      </div>
    </Layout>
  );
};
export default CreateCustomer;
