import React, { useEffect, useState, useRef } from "react";
import Layout from "../../layout";
import { GetIdFromUrl, capitalizeFirstLetters } from "../../helper";
import { Link, useNavigate } from "react-router-dom";
import { GET_MENUS, GET_STAFFS } from "../../apis/api";

const Menus = () => {
  const [menuData, setMenuData] = useState([]);
  const [staffData, setstaffData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate(`/menus/create?restaurant_id=${restaurantId.current}`);
  };

  useEffect(() => {
    async function fetchMenuData() {
      try {
        const response = await fetch(
          `${GET_MENUS}?restaurant_id=${restaurantId.current}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: localStorage.token,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMenuData(data);
          setIsLoaded(true);
        } else {
          setError("Failed to fetch menu data.");
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchMenuData();
    async function fetchStaff() {
      try {
        const response = await fetch(
          `${GET_STAFFS(restaurantId.current)}&chef=true`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: localStorage.token,
            },
          }
        );
        const data = await response.json();
        const staffMapping = {};
        data.forEach((staff) => {
          staffMapping[staff.id] = capitalizeFirstLetters(staff.name);
        });
        setstaffData(staffMapping);
      } catch (error) {
        setError(error);
      }
    }
    fetchStaff();
  }, []);

  return (
    <Layout>
      <div className="staffs-container">
        <h1>Manage Menus</h1>
        <button className="add-staff-button" onClick={handleAddButtonClick}>
          Add Menu
        </button>
        {error && <div className="error">{error.message}</div>}
        {isLoaded && menuData.length !== 0 && (
          <table className="staff-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Cooking Time</th>
                <th>Price</th>
                <th>Chef</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {menuData.map((menu, index) => (
                <tr key={index}>
                  <td>{menu.name}</td>
                  <td>{menu.description}</td>
                  <td>{menu.cooking_time}</td>
                  <td>{menu.price}</td>
                  <td>{staffData[menu.staff_id]}</td>
                  <td>
                    <Link
                      to={`/menus/${menu.id}/edit?restaurant_id=${restaurantId.current}`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default Menus;
