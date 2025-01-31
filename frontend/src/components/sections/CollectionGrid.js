// src/components/sections/CollectionGrid.js
import React from "react";
import "../../css/Collections.css"; // Importando o CSS
import dress1 from "../../assets/images/IMG_2986.JPG";
import dress2 from "../../assets/images/IMG_2987.JPG";
import dress3 from "../../assets/images/IMG_2989.JPG";
import { useMoodboard } from "../../context/MoodboardContext"; // Importa o contexto
import { FaHeart } from "react-icons/fa"; // Ícone de coração


const CollectionGrid = () => {
  const { moodboardItems, addToMoodboard, removeFromMoodboard } = useMoodboard();

  const dresses = [
    { id: 1, name: "Vestido Elegante", image: dress1 },
    { id: 2, name: "Vestido Clássico", image: dress2 },
    { id: 3, name: "Vestido Moderno", image: dress3 },
    { id: 4, name: "Vestido Normais", image: dress1 },
    { id: 5, name: "Vestido Longos", image: dress2 },
    { id: 6, name: "Vestido Elegante", image: dress3 },
  ];

  return (
    <section className="collection-container">
      <h2 className="collection-title">Coleção Exclusiva</h2>
      <div className="grid-container">
        {dresses.map((dress) => {
          const isFavorite = moodboardItems.some(item => item.id === dress.id);

          return (
            <div key={dress.id} className="grid-item">
              <img src={dress.image} alt={dress.name} />
              <p>{dress.name}</p>
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
