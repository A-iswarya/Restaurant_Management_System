import React, { useEffect, useState, useRef } from "react";
import Layout from "../../layout";
import { GetIdFromUrl } from "../../helper";
import { Link, useNavigate } from "react-router-dom";
import { GET_MENUS } from "../../apis/api";

const Menus = () => {
  const [menuData, setMenuData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const adminId = useRef(GetIdFromUrl("admin_id"));
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate(
      `/menus/create?admin_id=${adminId.current}&restaurant_id=${restaurantId.current}`
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${GET_MENUS}?admin_id=${adminId.current}`,
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
    fetchData();
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
                  <td>{menu.staff_id}</td>
                  <td>
                    <Link
                      to={`/menus/${menu.id}/edit?admin_id=${adminId.current}&restaurant_id=${restaurantId.current}`}
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
