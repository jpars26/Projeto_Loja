// src/components/sections/CollectionGrid.js
import React from "react";
import "../../css/Collections.css"; // Importando o CSS
import collections from "../../data/collections";
import { Link } from "react-router-dom";

const CollectionGrid = () => {
  return (
    <section className="collection-container">
      <h2 className="collection-title">Coleção Exclusiva</h2>
      <div className="grid-container">
        {collections.map((dress) => (
          <div key={dress.id} className="grid-item">
            <Link to={`/collections/${dress.id}`} className="collection-card"> 
              <img src={dress.image} alt={dress.name} />
              <p>{dress.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionGrid;
