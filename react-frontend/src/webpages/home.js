import React from "react";

const Home = () => {
  const containerStyle = {
    textAlign: "center",
    backgroundColor: "#64B5F6", // Lighter blue background color
    color: "white", // White text color
    padding: "20px",
    fontFamily: "Arial, sans-serif", // Specify a font
  };

  const buttonStyle = {
    backgroundColor: "#1976D2",
    color: "white",
    padding: "8px 18px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    borderRadius: "5px", // Rounded corners
    margin: "10px", // Add some margin
  };

  const selectStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    width: "40%"
  };

  return (
    <div style={containerStyle}>
      <h1>DineEase</h1>
      <select style={selectStyle}>
        <option value="someOption">Some option</option>
        <option value="otherOption">Other option</option>
      </select>
      <br /><br />
      <button style={buttonStyle} onClick={() => alert('hey')}>Submit</button>
    </div>
  );
};

export default Home;
