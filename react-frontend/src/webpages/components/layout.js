import React from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Layout = ({ userType, children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    localStorage.removeItem("expiry_date");
    navigate("/");
  };
  return (
    <div className="dashboard">
      <div className="banner">
        <h1>
          DineEase
          <IoRestaurantOutline style={{ marginLeft: "20px" }} />
        </h1>
        {userType && (
          <div className="user-info">
            <span className="user-type">{userType} |</span>
            <span className="edit-profile">Edit Profile |</span>
            <span className="logout" onClick={handleLogout}>
              Logout
              <BiLogOut
                style={{ verticalAlign: "middle", marginLeft: "5px" }}
              />
            </span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
export default Layout;
