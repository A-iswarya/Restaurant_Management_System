import React, { useRef } from "react";
import { TfiLayoutMenuV } from "react-icons/tfi";
import { VscFeedback } from "react-icons/vsc";
import {
  MdDining,
  MdOutlineBorderColor,
  MdOutlineManageAccounts,
  MdTableRestaurant,
  MdOutlineModeEditOutline,
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
      <Card
        key={"Manage Tables"}
        icon={<MdTableRestaurant />}
        title={"Manage Tables"}
        navigateTo={`/tables?restaurant_id=${restaurantId.current}`}
      />,
      <Card
        key={"Edit Restaurant"}
        icon={<MdOutlineModeEditOutline />}
        title={"Edit Restaurant"}
        navigateTo={`/restaurants/${restaurantId.current}/edit`}
      />,
    ];
  else if (userType === "Customer")
    cards = [
      <Card
        key={"Reserve a Table"}
        icon={<MdDining />}
        title={"Reserve a Table"}
        navigateTo={`/reservations?restaurant_id=${restaurantId.current}`}
      />,
      <Card
        key={"Add Feedback"}
        icon={<VscFeedback />}
        title={"Add Feedback"}
        navigateTo={`/feedbacks?restaurant_id=${restaurantId.current}`}
      />,
    ];
  else if (userType === "Staff")
    cards = [
      <Card
        key={"Manage Order"}
        icon={<MdOutlineBorderColor />}
        title={"Manage Order"}
        navigateTo={`/orders?restaurant_id=${restaurantId.current}`}
      />,
      <Card
        key={"Update Order Status"}
        icon={<PiCookingPotBold />}
        title={"Update Order Status"}
        navigateTo={`/orders?restaurant_id=${restaurantId.current}&update_status=true`}
      />,
      <Card
        key={"Update Table Status"}
        icon={<MdTableRestaurant />}
        title={"Update Table Status"}
        navigateTo={`/tables?restaurant_id=${restaurantId.current}&update_status=true`}
      />,
    ];
  else cards = [<h2 className="invalid-user">Invalid User!</h2>];

  return (
    <Layout>
      <div className="card-container">{cards}</div>
    </Layout>
  );
};
export default Dashboard;
