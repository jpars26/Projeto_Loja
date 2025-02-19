import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import collections from "../data/collections"; 
import "../css/Collection_ID.css"; 
import { useMoodboard } from "../context/MoodboardContext";
import { FaHeart } from "react-icons/fa";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; 

const Collection_ID = () => {
  const { id } = useParams(); 
  const collection = collections.find(col => col.id === id);
  const { moodboardItems, addToMoodboard, removeFromMoodboard } = useMoodboard();
  const gridRef = useRef(null);
  const [likedItems, setLikedItems] = useState({});
  const [lastTap, setLastTap] = useState(0);

  // Função para ativar/desativar o favorito
  const handleFavoriteClick = (product) => {
    const isFavorite = moodboardItems.some(item => item.id === product.id);
    if (isFavorite) {
      removeFromMoodboard(product.id);
    } else {
      addToMoodboard(product);
      setLikedItems(prev => ({ ...prev, [product.id]: true })); 

      setTimeout(() => {
        setLikedItems(prev => ({ ...prev, [product.id]: false }));
      }, 1000);
    }
  };

  // Função para o duplo clique no desktop e toque duplo no mobile
  const handleDoubleClick = (product) => {
    const now = new Date().getTime();

    if (now - lastTap < 300) { // Se o intervalo for menor que 300ms, considera duplo clique
      handleFavoriteClick(product);
    }

    setLastTap(now);
  };

  if (!collection) {
    return <h2>Coleção não encontrada!</h2>;
  }

  return ( 
    <Layout title={collection.name}>
      <Helmet>
        <title>{collection.name} - Vestidos de Noiva | Iara Noivas</title>
      </Helmet>
      
      <img effect="blur" src={collection.banner} loading="lazy" alt={collection.name} className="collection-banner" />
      <p>Explore nossa coleção exclusiva {collection.name}.</p>
      <h1>❤️ Curta seus vestidos favoritos! Os vestidos que você curtir ficarão salvos na página de Favoritos (ícone do coração no topo)❤️. </h1>

      {/* Grid de Produtos */}
      <div className="product-grid" ref={gridRef}>
        {collection.products.map(product => {
          const isFavorite = moodboardItems.some(item => item.id === product.id);

          return (
            <div 
              key={product.id} 
              className="product-card hidden"
              onDoubleClick={() => handleFavoriteClick(product)} // Desktop: Duplo clique ativa o like
              onTouchEnd={() => handleDoubleClick(product)} // Mobile: Detecta toque duplo
            >
              <div className="image-container">
                <LazyLoadImage effect="blur" src={product.image} loading="lazy" alt={product.name} />

                {/* Ícone de Favoritar sobre a Imagem */}
                <button
                  data-testid="favorite-button"
                  className={`heart-btn ${isFavorite ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que o clique no botão ative o duplo clique da imagem
                    handleFavoriteClick(product);
                  }}
                >
                  <FaHeart size={20} />
                </button>

                {/* Efeito de coração subindo */}
                {likedItems[product.id] && (
                  <span className="floating-heart">
                    <FaHeart />
                  </span>
                )}
              </div>

              <h3>{product.name}</h3>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Collection_ID;
