// src/components/sections/CollectionGrid.js
import React from "react";
import "../../css/Collections.css"; // Importando o CSS
import collections from "../../data/collections";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../assets/images/logo.png";

const CollectionGrid = () => {
  return (
    <section className="collection-container">
      <LazyLoadImage src={logo} alt="Coleção Exclusiva" className="collection-banner" />
      <h2 className="collection-title">Coleção Exclusiva</h2>
      
      <div className="grid-container">
        {collections.map((dress) => (
          <div key={dress.id} className="grid-item">
            <Link to={`/collections/${dress.id}`} className="collection-card"> 
              <LazyLoadImage  effect="blur" src={dress.image} alt={dress.name} />
              <p>{dress.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionGrid;
