import React from "react";
import { TfiLayoutMenuV } from "react-icons/tfi";
import { VscFeedback } from "react-icons/vsc";
import { MdDining, MdOutlineBorderColor } from "react-icons/md";
import { PiCookingPotBold } from "react-icons/pi";
import Card from "../card";
import Layout from "../layout";

const Dashboard = () => {
  const userType =
    localStorage.getItem("userType") &&
    JSON.parse(localStorage.getItem("userType"));

  let cards;
  if (userType === "Admin")
    cards = [
      <Card
        key={"Manage Menu"}
        icon={<TfiLayoutMenuV />}
        title={"Manage Menu"}
      />,
    ];
  else if (userType === "Customer")
    cards = [
      <Card key={"Book a Table"} icon={<MdDining />} title={"Book a Table"} />,
      <Card
        key={"Add Feedback"}
        icon={<VscFeedback />}
        title={"Add Feedback"}
      />,
    ];
  else if (userType === "Staff")
    cards = [
      <Card
        key={"Take Order"}
        icon={<MdOutlineBorderColor />}
        title={"Take Order"}
      />,
      <Card
        key={"Update Order Status"}
        icon={<PiCookingPotBold />}
        title={"Update Order Status"}
      />,
    ];
  else cards = [<h2 className="invalid-user">Invalid User!</h2>];

  return (
    <Layout userType={userType}>
      {<div className="card-container">{cards}</div>}
    </Layout>
  );
};
export default Dashboard;
