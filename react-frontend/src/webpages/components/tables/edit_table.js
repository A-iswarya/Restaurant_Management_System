import React from "react";
import EditForm from "./table_form";

const EditTable = () => {
  return (
    <div className="editAdmin">
      <h1>Edit Table</h1>
      <EditForm edit={true} />
    </div>
  );
};
export default EditTable;
