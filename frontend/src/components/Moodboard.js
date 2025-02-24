import React, { useEffect } from "react";
import "../css/Moodboard.css";
import { useMoodboard } from "../context/MoodboardContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaWhatsapp, FaShareAlt } from "react-icons/fa";
import { shareFavorites } from "../utils/shareFavorites";
import { shareOnWhatsApp } from "../utils/shareOnWhatsApp";
import { startTour, stopTour, isTourActive, } from "../utils/TourGuide";
import tourSteps from "../utils/TourSteps"; // Importando os steps


const Moodboard = () => {
  const { moodboardItems, removeFromMoodboard } = useMoodboard();

  useEffect(() => {
    setTimeout(() => {
      if (!isTourActive()) {
        startTour("moodboard", tourSteps.moodboard);
      }

      return () => {
        stopTour();
      };
    }, 1000);
  }, []);

  return (
    <section className="moodboard-container">
      <h2 className="moodboard-title">Meu Favorito</h2>
      {moodboardItems.length === 0 ? (
        <p>Você ainda não adicionou nada a sua lista de favoritos.</p>
      ) : (
        <div className="grid-container">
          {moodboardItems.map((item) => (
            <div key={item.id} className="grid-item">
              <LazyLoadImage effect="blur" src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <div className="share-buttons-container">
                <button className="remove-btn" onClick={() => removeFromMoodboard(item.id)}>
                  ❌
                </button>
                <button className="whatsapp-share" onClick={() => shareOnWhatsApp(moodboardItems)}>
                  <FaWhatsapp size={24} />
                </button>
                <button className="share-button" onClick={() => shareFavorites(moodboardItems)}>
                  <FaShareAlt size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Moodboard;
