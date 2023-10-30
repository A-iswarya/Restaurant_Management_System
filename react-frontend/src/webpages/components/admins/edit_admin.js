import React from "react";
import EditForm from "../form";
import Layout from "../../layout";

const EditAdmin = () => {
  return (
    <Layout>
      <div className="editAdmin">
        <h1>Edit Admin</h1>
        <EditForm edit={true} isAdmin={true} />
      </div>
    </Layout>
  );
};
export default EditAdmin;
