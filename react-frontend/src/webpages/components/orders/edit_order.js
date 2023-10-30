import React from "react";
import EditForm from "./order_form";
import Layout from "../../layout";

const EditOrder = () => {
  return (
    <Layout>
      <div className="editAdmin">
        <h1>Edit Order</h1>
        <EditForm edit={true} />
      </div>
    </Layout>
  );
};
export default EditOrder;
