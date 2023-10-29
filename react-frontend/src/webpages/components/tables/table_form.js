import React, { useEffect, useRef, useState } from "react";
import { GET_SINGLE_TABLE, GET_TABLES, GET_STAFFS } from "../../apis/api";

import { GetIdFromUrl } from "../../helper";
import { useNavigate, useParams } from "react-router-dom";
import DeleteTable from "./delete_table";

const TableForm = ({ edit }) => {
  const restaurantId = useRef(GetIdFromUrl("restaurant_id"));
  const { tableId } = useParams();
  const navigate = useNavigate();
  const submitHttpCode = edit ? "PATCH" : "POST";
  const submitApi = edit ? GET_SINGLE_TABLE(tableId) : GET_TABLES;
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    table_number: "",
    no_of_seats: "",
    staff_id: "",
    restaurant_id: restaurantId.current,
  });
  const [staffOptions, setStaffOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GET_SINGLE_TABLE(tableId), {
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
            table_number: data.table_number,
            no_of_seats: data.no_of_seats,
            staff_id: data.staff_id,
          },
        });
      } catch (error) {
        setError(error);
      }
    }
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
        setStaffOptions(data);
      } catch (error) {
        setError(error);
      }
    }
    fetchStaff();
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
        navigate(`/tables?restaurant_id=${restaurantId.current}`);
      } else setError(`Table ${edit ? "Updation" : "Creation"} Failed`);
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
        <label>Table Number: {edit ? "" : <span>*</span>}</label>
        <input
          value={formData.table_number}
          type="number"
          onChange={handleChange}
          name="table_number"
          required={true}
        />
        <br />
        <label>No of Seats: {edit ? "" : <span>*</span>}</label>
        <textarea
          value={formData.no_of_seats}
          type="number"
          onChange={handleChange}
          name="no_of_seats"
        />
        <br />
        <label>Staff In Charge:</label>
        <select
          value={formData.staff_id}
          onChange={handleChange}
          name="staff_id"
        >
          <option value="">Select a Staff Member</option>
          {staffOptions &&
            staffOptions.map((staff) => (
              <option
                key={`${staff.id}`}
                value={`${staff.id}`}
              >{`${staff.name.toUpperCase()}`}</option>
            ))}
        </select>
        <br />
        <button>{edit ? "EDIT" : "Create"}</button>
      </form>
      {edit && (
        <DeleteTable restaurantId={restaurantId.current} tableId={tableId} />
      )}
    </div>
  );
};

export default TableForm;
