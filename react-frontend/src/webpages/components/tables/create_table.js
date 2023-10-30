import React from "react";
import TableForm from "./table_form";
import Layout from "../../layout";

const CreateTable = () => {
  return (
    <Layout>
      <div className="addMenu">
        <h1>Add Table</h1>
        <TableForm />
      </div>
    </Layout>
  );
};
export default CreateTable;
