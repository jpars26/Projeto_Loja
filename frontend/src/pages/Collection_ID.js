import React from "react";
import { useParams } from "react-router-dom";
import collections from "../data/collections"; 
import "../css/Collection_ID.css"; 
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useMoodboard } from "../context/MoodboardContext"; // ajuste o caminho conforme sua estrutura
import { FaHeart } from "react-icons/fa";


const Collection_ID = () => {
  const { id } = useParams(); 
  const collection = collections.find(col => col.id === id);

  // Obtenha os itens do moodboard e as funções de adicionar/remover
  const { moodboardItems, addToMoodboard, removeFromMoodboard } = useMoodboard();

  if (!collection) {
    return <h2>Coleção não encontrada!</h2>;
  }


  return ( 
    <div className="collection-page">
      <Header/>
      <h1>{collection.name}</h1>
      <img src={collection.banner} alt={collection.name} className="collection-banner" />
      <p>Explore nossa coleção exclusiva {collection.name}.</p>

      {/* Grid de Produtos */}
      <div className="product-grid">
        {collection.products.map(product => {
          // Verifica se o produto já está favoritado
          const isFavorite = moodboardItems.some(item => item.id === product.id);

          return (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>

              {/* Botão de Favoritar */}
              <button
                className={`heart-btn ${isFavorite ? "active" : ""}`}
                onClick={() => isFavorite ? removeFromMoodboard(product.id) : addToMoodboard(product)}
              >
                <FaHeart />
              </button>
            </div>
          );
        })}
      </div>

      <Footer/>
    </div>
  );
};

export default Collection_ID;
