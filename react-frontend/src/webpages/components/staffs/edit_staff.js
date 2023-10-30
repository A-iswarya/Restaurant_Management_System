import React from "react";
import EditForm from "../form";
import Layout from "../../layout";

const EditStaff = () => {
  return (
    <Layout>
      <div className="editAdmin">
        <h1>Edit Staff</h1>
        <EditForm edit={true} isStaff={true} />
      </div>
    </Layout>
  );
};
export default EditStaff;
