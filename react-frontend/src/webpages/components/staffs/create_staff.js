import React from "react";
import StaffForm from "../form";
import Layout from "../../layout";

const CreateStaff = () => {
  return (
    <Layout>
      <div className="addStaff">
        <h1>Add Staff</h1>
        <StaffForm isStaff={true} />
      </div>
    </Layout>
  );
};
export default CreateStaff;
