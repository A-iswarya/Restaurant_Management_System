import React from "react";
import EditForm from "./restaurant_form";

const EditRestaurant = () => {
  return (
    <div className="addRestaurant">
      <h1>Edit Restaurant</h1>
      <EditForm edit={true} />
    </div>
  );
};
export default EditRestaurant;
