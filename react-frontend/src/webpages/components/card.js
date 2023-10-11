import React from "react";
const Card = ({ icon, title }) => {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <h2 className="card-title">{title}</h2>
    </div>
  );
};
export default Card;
