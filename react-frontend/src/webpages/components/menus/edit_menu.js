import React from "react";
import EditForm from "./menu_form";
import Layout from "../../layout";

const EditMenu = () => {
  return (
    <Layout>
      <div className="editAdmin">
        <h1>Edit Menu</h1>
        <EditForm edit={true} />
      </div>
    </Layout>
  );
};
export default EditMenu;
