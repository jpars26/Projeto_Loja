// src/components/sections/CustomerGallery.js
import React from "react";
import CustomerCard from "./CustomerCard";
import "../css/CustomerGallery.css";
import customers from "../data/customers"; // Certifique-se de que esse arquivo existe

const CustomerGallery = () => {
  return (
    <section className="customer-gallery">
      <h2>Elas também usam Iara Noivas</h2>
      <div className="gallery-grid">
        {customers.map((customer) => (
          <CustomerCard key={customer.id} image={customer.image} name={customer.name} />
        ))}
      </div>
    </section>
  );
};

export default CustomerGallery;
