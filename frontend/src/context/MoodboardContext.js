import React, { createContext, useState, useContext } from "react";

// Criando o contexto
const MoodboardContext = createContext();

export const MoodboardProvider = ({ children }) => {
  const [moodboardItems, setMoodboardItems] = useState([]);

  // Função para adicionar vestidos
  const addToMoodboard = (item) => {
    setMoodboardItems((prevItems) => {
      const updatedItems = [...prevItems, item];
      localStorage.setItem("moodboard", JSON.stringify(updatedItems)); // Salva no localStorage
      return updatedItems;
    });
  };

  // Função para remover vestidos
  const removeFromMoodboard = (id) => {
    setMoodboardItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      localStorage.setItem("moodboard", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return (
    <MoodboardContext.Provider value={{ moodboardItems, addToMoodboard, removeFromMoodboard }}>
      {children}
    </MoodboardContext.Provider>
  );
};

// Hook para usar o contexto
export const useMoodboard = () => useContext(MoodboardContext);
