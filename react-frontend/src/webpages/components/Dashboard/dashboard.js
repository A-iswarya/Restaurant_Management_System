import React from "react";
import { BiLogOut } from "react-icons/bi";
import { TfiLayoutMenuV } from "react-icons/tfi";
import { VscFeedback } from "react-icons/vsc";
import { MdDining, MdOutlineBorderColor } from "react-icons/md";
import { PiCookingPotBold } from "react-icons/pi";
import Card from "../card";

const Dashboard = () => {
  const user =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const userType =
    localStorage.getItem("userType") &&
    JSON.parse(localStorage.getItem("userType"));
  let cards;
  if (userType === "Admin")
    cards = [<Card icon={<TfiLayoutMenuV />} title={"Manage Menu"} />];
  else if (userType === "Customer")
    cards = [
      <Card icon={<MdDining />} title={"Book a Table"} />,
      <Card icon={<VscFeedback />} title={"Add Feedback"} />,
    ];
  else if (userType === "Staff")
    cards = [
      <Card icon={<MdOutlineBorderColor />} title={"Take Order"} />,
      <Card icon={<PiCookingPotBold />} title={"Update Order Status"} />,
    ];
  else cards = [<h2 className="invalid-user">Invalid User!</h2>];
  return (
    <div className="dashboard">
      <div className="header">
        <h1>DineEase</h1>
      </div>
      <div>
        <font>{userType}</font>
      </div>
      <div className="logout">
        <button id="logout-button">
          Logout
          <BiLogOut style={{ verticalAlign: "middle", marginLeft: "5px" }} />
        </button>
      </div>
      <div className="card-container">{cards}</div>
    </div>
  );
};
export default Dashboard;
