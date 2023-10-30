import React from "react";
import CreateForm from "../form";
import Layout from "../../layout";

const CreateAdmin = () => {
  return (
    <Layout>
      <div className="addAdmin">
        <h1>Add Admin</h1>
        <CreateForm isAdmin={true} />
      </div>
    </Layout>
  );
};
export default CreateAdmin;
