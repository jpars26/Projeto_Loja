// src/components/sections/Moodboard.js
import React from "react";
import "../css/Moodboard.css";
import { useMoodboard } from "../context/MoodboardContext";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Moodboard = () => {
  const { moodboardItems, removeFromMoodboard } = useMoodboard();

  return (
    <section className="moodboard-container">
      <h2 className="moodboard-title">Meu Favorito</h2>
      {moodboardItems.length === 0 ? (
        <p>Você ainda não adicionou nada a sua lista de favoritos.</p>
      ) : (
        <div className="grid-container">
          {moodboardItems.map((item) => (
            <div key={item.id} className="grid-item">
              <LazyLoadImage effect="blur"src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <button className="remove-btn" onClick={() => removeFromMoodboard(item.id)}>
                ✖ 
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Moodboard;
