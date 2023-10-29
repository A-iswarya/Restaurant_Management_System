import React from "react";
import EditForm from "./reservation_form";

const EditReservation = () => {
  return (
    <div className="editAdmin">
      <h1>Edit Reservation</h1>
      <EditForm edit={true} />
    </div>
  );
};
export default EditReservation;
