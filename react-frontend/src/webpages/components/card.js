import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ icon, title, navigateTo }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(navigateTo);
  };
  return (
    <div className="card" onClick={handleSubmit}>
      <div className="card-icon">{icon}</div>
      <h2 className="card-title">{title}</h2>
    </div>
  );
};
export default Card;
