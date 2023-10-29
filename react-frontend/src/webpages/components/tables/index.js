import React, { useEffect, useState, useRef } from "react";
import Layout from "../../layout";
import { GetIdFromUrl, capitalizeFirstLetters } from "../../helper";
import { Link, useNavigate } from "react-router-dom";
import {
  GET_TABLES,
  GET_STAFFS,
  POST_TABLE_UPDATE_STATUS,
} from "../../apis/api";

const Tables = () => {
  const [tableData, setTableData] = useState([]);
  const [staffData, setstaffData] = useState({});
  const [tableStatusData, setTableStatusData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));
  const updateStatus = useRef(GetIdFromUrl("update_status"));
  const navigate = useNavigate();

  const statusMapping = {
    free: "Free",
    reserved: "Reserved",
    occupied: "Occupied",
  };

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
          setTableStatusData(
            data.map((table) => ({
              id: table.id,
              status: table.status,
            }))
          );
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
    if (!updateStatus) fetchStaff();
  }, []);

  const handleStatusChange = (e, tableId) => {
    const value = e.target.value;

    const updatedTableStatusData = tableStatusData.map((table) => {
      if (table.id === tableId) {
        return { ...table, status: value };
      }
      return table;
    });
    setTableStatusData(updatedTableStatusData);
  };

  const handleUpdateStatus = async (tableId) => {
    try {
      const response = await fetch(POST_TABLE_UPDATE_STATUS(tableId), {
        method: "POST",
        body: JSON.stringify(
          tableStatusData.find((status) => status.id === tableId)
        ),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.token,
        },
      });
      if (response.ok) {
        navigate(
          `/tables?restaurant_id=${restaurantId.current}&update_status=true`
        );
      } else setError("Status updation failed");
    } catch {
      setError("Something went wrong!");
    }
  };

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
                <th>Status</th>
                {!updateStatus.current ? <th>Waitstaff</th> : null}
                <th>{updateStatus.current ? "Save" : "Edit"}</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((table, index) => (
                <tr key={index}>
                  <td>{table.table_number}</td>
                  <td>{table.no_of_seats}</td>
                  <td>
                    {!updateStatus.current ? (
                      capitalizeFirstLetters(table.status)
                    ) : (
                      <select
                        value={
                          tableStatusData.find(
                            (tableStatus) => tableStatus.id === table.id
                          ).status
                        }
                        onChange={(e) => {
                          handleStatusChange(e, table.id);
                        }}
                        name={table.id}
                      >
                        {Object.keys(statusMapping).map((key) => (
                          <option key={key} value={key}>
                            {statusMapping[key]}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  {!updateStatus.current ? (
                    <td>{staffData[table.staff_id]}</td>
                  ) : null}
                  <td>
                    {updateStatus.current ? (
                      <span
                        className="saveOrder"
                        onClick={(e) => handleUpdateStatus(table.id)}
                      >
                        Save
                      </span>
                    ) : (
                      <Link
                        to={`/tables/${table.id}/edit?restaurant_id=${restaurantId.current}`}
                      >
                        Edit
                      </Link>
                    )}
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
