import React, { useEffect, useState, useRef } from "react";
import Layout from "../../layout";
import { GetIdFromUrl, capitalizeFirstLetters } from "../../helper";
import { Link, useNavigate } from "react-router-dom";
import { GET_TABLES, GET_STAFFS } from "../../apis/api";

const Tables = () => {
  const [tableData, setTableData] = useState([]);
  const [staffData, setstaffData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));
  const navigate = useNavigate();
  const handleAddButtonClick = () => {
    navigate(`/tables/create?restaurant_id=${restaurantId.current}`);
  };
  useEffect(() => {
    async function fetchTableData() {
      try {
        const response = await fetch(
          `${GET_TABLES}?restaurant_id=${restaurantId.current}`,
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
          setTableData(data);
          setIsLoaded(true);
        } else {
          setError("Failed to fetch table data.");
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchTableData();
    async function fetchStaff() {
      try {
        const response = await fetch(
          `${GET_STAFFS(restaurantId.current)}&waitstaff=true`,
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
        <h1>Manage Tables</h1>
        <button className="add-staff-button" onClick={handleAddButtonClick}>
          Add Table
        </button>
        {error && <div className="error">{error.message}</div>}
        {isLoaded && tableData.length !== 0 && (
          <table className="staff-table">
            <thead>
              <tr>
                <th>Table Number</th>
                <th>No of Seats</th>
                <th>Waitstaff</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((table, index) => (
                <tr key={index}>
                  <td>{table.table_number}</td>
                  <td>{table.no_of_seats}</td>
                  <td>{staffData[table.staff_id]}</td>
                  <td>
                    <Link
                      to={`/tables/${table.id}/edit?restaurant_id=${restaurantId.current}`}
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

export default Tables;
