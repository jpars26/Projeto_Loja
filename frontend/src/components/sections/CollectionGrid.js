// src/components/sections/CollectionGrid.js
import React from "react";
import "../../css/Collections.css"; // Importando o CSS
import { useMoodboard } from "../../context/MoodboardContext"; // Importa o contexto
import { FaHeart } from "react-icons/fa"; // Ícone de coração
import collections from "../../data/collections"
import { Link } from "react-router-dom";


const CollectionGrid = () => {
  const { moodboardItems, addToMoodboard, removeFromMoodboard } = useMoodboard();

  return (
    <section className="collection-container">
      <h2 className="collection-title">Coleção Exclusiva</h2>
      <div className="grid-container">
        {collections.map((dress) => {
          const isFavorite = moodboardItems.some(item => item.id === dress.id);

          return (
            <div key={dress.id} className="grid-item">
              <Link to={`/collections/${dress.id}`} className="collection-card"> 
                <img src={dress.image} alt={dress.name} />
                <p>{dress.name}</p>
              </Link>
              
              {/* Ícone de coração como botão */}
              <button
                className={`heart-btn ${isFavorite ? "active" : ""}`}
                onClick={() => isFavorite ? removeFromMoodboard(dress.id) : addToMoodboard(dress)}
              >
                <FaHeart />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CollectionGrid;