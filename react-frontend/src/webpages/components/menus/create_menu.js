import React from "react";
import MenuForm from "./menu_form";
import Layout from "../../layout";

const CreateMenu = () => {
  return (
    <Layout>
      <div className="addMenu">
        <h1>Add Menu</h1>
        <MenuForm />
      </div>
    </Layout>
  );
};
export default CreateMenu;
