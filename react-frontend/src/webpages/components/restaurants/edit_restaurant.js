import React from "react";
import EditForm from "./restaurant_form";
import Layout from "../../layout";

const EditRestaurant = () => {
  return (
    <Layout>
      <div className="addRestaurant">
        <h1>Edit Restaurant</h1>
        <EditForm edit={true} />
      </div>
    </Layout>
  );
};
export default EditRestaurant;
