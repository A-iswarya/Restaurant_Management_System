import React from "react";
import RestaurantForm from "./restaurant_form";
import Layout from "../../layout";

const CreateRestaurant = () => {
  return (
    <Layout>
      <div className="addRestaurant">
        <h1>Add Restaurant</h1>
        <RestaurantForm />
      </div>
    </Layout>
  );
};
export default CreateRestaurant;
