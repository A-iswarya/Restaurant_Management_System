import React, { useEffect, useState, useRef } from "react";
import Layout from "../../layout";
import { GET_RESERVATIONS, GET_TABLES } from "../../apis/api";
import { useNavigate, Link } from "react-router-dom";
import { GetIdFromUrl } from "../../helper";

const Reservations = () => {
  const [reservationData, setReservationData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));

  const handleAddButtonClick = () => {
    navigate(`/reservations/create?restaurant_id=${restaurantId.current}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GET_RESERVATIONS, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: localStorage.token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setReservationData(data);
          setIsLoaded(true);
        } else {
          setError("Failed to fetch reservation data.");
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
    async function fetchTables() {
      try {
        const response = await fetch(
          `${GET_TABLES}?restauranu_id=${restaurantId.current}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: localStorage.token,
            },
          }
        );
        const data = await response.json();

        const tableMapping = {};
        data.forEach((table) => {
          tableMapping[table.id] = table.table_number;
        });
        setTableData(tableMapping);
      } catch (error) {
        setError(error);
      }
    }
    fetchTables();
  }, []);

  return (
    <Layout>
      <div className="staffs-container">
        <h1>Reserve a Table</h1>
        <button className="add-staff-button" onClick={handleAddButtonClick}>
          Book
        </button>
        {error && <div className="error">{error.message}</div>}
        {isLoaded && reservationData.length !== 0 && (
          <table className="staff-table">
            <thead>
              <tr>
                <th>Number</th>
                <th>Table Number</th>
                <th>Time</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {reservationData.map((reservation, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{tableData[reservation.table_id]}</td>
                  <td>{new Date(reservation.time).toLocaleString()}</td>
                  <td>
                    <Link to={`/reservations/${reservation.id}/edit`}>
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

export default Reservations;
