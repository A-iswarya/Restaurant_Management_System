import React from "react";
import CreateForm from "../form";

const CreateAdmin = () => {
  return (
    <div className="addAdmin">
      <h1>Add Admin</h1>
      <CreateForm isAdmin={true} />
    </div>
  );
};
export default CreateAdmin;
