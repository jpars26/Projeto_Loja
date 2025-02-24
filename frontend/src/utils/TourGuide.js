// src/utils/TourGuide.js
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import "../css/TourGuide.css"; // Importa a estilização personalizada

let tourInstance = null;

const TOUR_STORAGE_KEY = "tourCompleted"; // Define a chave de armazenamento

export const isTourActive = () => {
  return tourInstance && tourInstance.isActive();
};

export const startTour = (tourId, steps) => {
  const tourCompleted = localStorage.getItem(`${TOUR_STORAGE_KEY}_${tourId}`); // Verifica se o tour foi concluído
  if (tourCompleted || isTourActive()) return; // Se já foi concluído, não inicia

  tourInstance = new Shepherd.Tour({
    defaultStepOptions: {
      cancelIcon: { enabled: true },
      classes: "shepherd-theme-custom",
      scrollTo: { behavior: "smooth", block: "center" },
      arrow: true, // Ativa a seta
    }
  });

  steps.forEach((step) => tourInstance.addStep(step));

  tourInstance.on("complete", () => {
    localStorage.setItem(`${TOUR_STORAGE_KEY}_${tourId}`, "true"); // Marca o tour como concluído
    tourInstance = null;
  });

  tourInstance.start();
};

export const nextStep = () => {
  if (tourInstance) {
    tourInstance.next();
  }
};

export const completeTour = () => {
  if (tourInstance) {
    tourInstance.complete();
    tourInstance = null;
  }
};

export const stopTour = () => {
  if (tourInstance) {
    tourInstance.cancel();
    tourInstance = null;
  }
};
