import React from "react";
import ReservationForm from "./reservation_form";
import Layout from "../../layout";

const CreateReservation = () => {
  return (
    <Layout>
      <div className="addOrder">
        <h1>Book a Table</h1>
        <ReservationForm />
      </div>
    </Layout>
  );
};
export default CreateReservation;
