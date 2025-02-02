// CustomerCard.js
import React from "react";
import "../css/CustomerCard.css";


const CustomerCard = ({ image, name }) => {
  return (
    <div className="customer-card">
      <img src={image} alt={name} className="customer-image" />
      <div className="overlay">
        <div className="customer-name">{name}</div>
      </div>
    </div>
  );
};

export default CustomerCard;
