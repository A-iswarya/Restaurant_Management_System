import React from "react";
import EditForm from "./table_form";
import Layout from "../../layout";

const EditTable = () => {
  return (
    <Layout>
      <div className="editAdmin">
        <h1>Edit Table</h1>
        <EditForm edit={true} />
      </div>
    </Layout>
  );
};
export default EditTable;
