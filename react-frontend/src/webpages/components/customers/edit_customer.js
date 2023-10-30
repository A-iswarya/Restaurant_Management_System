import React from "react";
import EditForm from "../form";
import Layout from "../../layout";

const EditCustomer = () => {
  return (
    <Layout>
      <div className="editAdmin">
        <h1>Edit Customer</h1>
        <EditForm edit={true} isCustomer={true} />
      </div>
    </Layout>
  );
};
export default EditCustomer;
