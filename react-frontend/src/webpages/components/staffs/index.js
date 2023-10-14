import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import { GET_STAFFS } from "../../apis/api";
import { GetRestaurantId } from "../../helper";

const Staffs = () => {
  const [staffData, setStaffData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const restaurantId = GetRestaurantId();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GET_STAFFS(restaurantId), {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: localStorage.token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStaffData(data);
          setIsLoaded(true);
        } else {
          setError("Failed to fetch staff data.");
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
        <h1>Manage Staffs</h1>
        <button className="add-staff-button">Add Staff</button>
        {error && <div className="error">{error}</div>}
        {isLoaded && staffData.length !== 0 && (
          <table className="staff-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff, index) => (
                <tr key={index}>
                  <td>{staff.name}</td>
                  <td>{staff.username}</td>
                  <td>{staff.designation}</td>
                  <td>{staff.email}</td>
                  <td>{staff.phone_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default Staffs;
