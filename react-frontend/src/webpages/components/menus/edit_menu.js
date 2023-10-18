import React from "react";
import EditForm from "./menu_form";

const EditMenu = () => {
  return (
    <div className="editAdmin">
      <h1>Edit Menu</h1>
      <EditForm edit={true} />
    </div>
  );
};
export default EditMenu;
