import React from "react";
import EditForm from "./reservation_form";
import Layout from "../../layout";

const EditReservation = () => {
  return (
    <Layout>
      <div className="editAdmin">
        <h1>Edit Reservation</h1>
        <EditForm edit={true} />
      </div>
    </Layout>
  );
};
export default EditReservation;
