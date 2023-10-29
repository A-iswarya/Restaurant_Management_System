import React, { useEffect, useState, useRef } from "react";
import {
  GET_SINGLE_RESERVATION,
  GET_RESERVATIONS,
  GET_TABLES,
} from "../../apis/api";

import { GetIdFromUrl, getLocalStorageValue } from "../../helper";
import { useNavigate, useParams } from "react-router-dom";
import DeleteReservation from "./delete_reservation";

const ReservationForm = ({ edit }) => {
  const { reservationId } = useParams();
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));
  const userId = getLocalStorageValue("user_id");
  const navigate = useNavigate();
  const submitHttpCode = edit ? "PATCH" : "POST";
  const submitApi = edit
    ? GET_SINGLE_RESERVATION(reservationId)
    : GET_RESERVATIONS;
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    table_id: "",
    customer_id: userId,
    time: new Date(),
  });

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GET_SINGLE_RESERVATION(reservationId), {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: localStorage.token,
          },
        });
        const data = await response.json();
        setFormData({
          ...formData,
          ...{
            table_id: data.table_id,
            customer_id: data.customer_id,
            time: data.time,
          },
        });
      } catch (error) {
        setError(error);
      }
    }
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
        setTableData(data);
      } catch (error) {
        setError(error);
      }
    }
    fetchTables();
    if (edit) {
      fetchData();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(submitApi, {
        method: submitHttpCode,
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.token,
        },
      });
      if (response.ok) {
        navigate(`/reservations?restaurant_id=${restaurantId.current}`);
      } else setError(`Reservation ${edit ? "Updation" : "Creation"} Failed`);
    } catch {
      setError("Something went wrong!");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="title">
          <label>Tables:</label>
        </div>
        <div className="tableSection">
          <div className="checkboxes">
            {tableData.map((table) => (
              <label key={table.id}>
                <input
                  type="radio"
                  id={table.id}
                  name="table_id"
                  value={table.id}
                  onChange={handleChange}
                  defaultChecked={edit ? table.id === formData.table_id : false}
                />
                {table.table_number}
              </label>
            ))}
          </div>
        </div>
        <br />
        <input type="datetime-local" name="time" onChange={handleChange} />
        <button>{edit ? "EDIT" : "Create"}</button>
      </form>
      {edit && (
        <DeleteReservation
          restaurantId={restaurantId.current}
          reservationId={reservationId}
        />
      )}
    </div>
  );
};

export default ReservationForm;
