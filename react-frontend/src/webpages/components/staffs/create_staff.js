import React from "react";
import StaffForm from "../form";

const CreateStaff = () => {
  return (
    <div className="addStaff">
      <h1>Add Staff</h1>
      <StaffForm isStaff={true} />
    </div>
  );
};
export default CreateStaff;
