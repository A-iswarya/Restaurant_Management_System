import React from "react";
import OrderForm from "./order_form";
import Layout from "../../layout";

const CreateOrder = () => {
  return (
    <Layout>
      <div className="addOrder">
        <h1>Add Order</h1>
        <OrderForm />
      </div>
    </Layout>
  );
};
export default CreateOrder;
