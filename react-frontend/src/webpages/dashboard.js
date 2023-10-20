import React, { useRef } from "react";
import { TfiLayoutMenuV } from "react-icons/tfi";
import { VscFeedback } from "react-icons/vsc";
import {
  MdDining,
  MdOutlineBorderColor,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { PiCookingPotBold } from "react-icons/pi";
import { GetIdFromUrl, getLocalStorageValue } from "./helper";
import Card from "./components/card";
import Layout from "./layout";

const Dashboard = () => {
  const userType = getLocalStorageValue("user_type");
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));

  let cards;
  if (userType === "Admin")
    cards = [
      <Card
        key={"Manage Menu"}
        icon={<TfiLayoutMenuV />}
        title={"Manage Menu"}
        navigateTo={`/menus?restaurant_id=${restaurantId.current}`}
      />,
      <Card
        key={"Manage Staffs"}
        icon={<MdOutlineManageAccounts />}
        title={"Manage Staffs"}
        navigateTo={`/staffs?restaurant_id=${restaurantId.current}`}
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

  return <Layout>{<div className="card-container">{cards}</div>}</Layout>;
};
export default Dashboard;
