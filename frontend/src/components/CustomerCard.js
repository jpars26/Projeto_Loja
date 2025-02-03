// CustomerCard.js
import React from "react";
import "../css/CustomerCard.css";
import { LazyLoadImage } from "react-lazy-load-image-component";


const CustomerCard = ({ image, name }) => {
  return (
    <div className="customer-card">
      <LazyLoadImage effect="blur" src={image} alt={name} className="customer-image" />
      <div className="overlay">
        <div className="customer-name">{name}</div>
      </div>
    </div>
  );
};

export default CustomerCard;
