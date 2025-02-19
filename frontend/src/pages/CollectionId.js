import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import collections from "../data/collections"; 
import "../css/Collection_ID.css"; 
import { useMoodboard } from "../context/MoodboardContext";
import { FaHeart } from "react-icons/fa";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Efeito de carregamento suave

const Collection_ID = () => {
  const { id } = useParams(); 
  const collection = collections.find(col => col.id === id);
  const { moodboardItems, addToMoodboard, removeFromMoodboard } = useMoodboard();
  const gridRef = useRef(null);
  const [likedItems, setLikedItems] = useState({});
  const tapTimeout = useRef(null); // 🔹 Para detectar toque duplo no mobile

  // Função para curtir/descurtir
  const handleFavoriteClick = (product) => {
    const isFavorite = moodboardItems.some(item => item.id === product.id);
    if (isFavorite) {
      removeFromMoodboard(product.id);
    } else {
      addToMoodboard(product);
      setLikedItems(prev => ({ ...prev, [product.id]: true }));

      // Remove o coração animado após 1 segundo
      setTimeout(() => {
        setLikedItems(prev => ({ ...prev, [product.id]: false }));
      }, 1000);
    }
  };

  // 🔹 Detecta duplo toque no mobile
  const handleTouch = (product) => {
    if (tapTimeout.current) {
      clearTimeout(tapTimeout.current);
      tapTimeout.current = null;
      handleFavoriteClick(product); // Dispara curtir
    } else {
      tapTimeout.current = setTimeout(() => {
        tapTimeout.current = null;
      }, 300); // Tempo máximo entre toques para ser considerado um "duplo toque"
    }
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
      <h1>🖤 Curta seus favoritos! Os vestidos que você curtir ficarão salvos na página de Favoritos (ícone do coração no topo).</h1>

      {/* Grid de Produtos */}
      <div className="product-grid" ref={gridRef}>
        {collection.products.map(product => {
          const isFavorite = moodboardItems.some(item => item.id === product.id);

          return (
            <div key={product.id} className="product-card hidden">
              <div className="image-container">
                {/* 🔹 Clique duplo no desktop e toque duplo no mobile */}
                <LazyLoadImage
                  effect="blur"
                  src={product.image}
                  loading="lazy"
                  alt={product.name}
                  className="clickable-image"
                  onDoubleClick={() => handleFavoriteClick(product)} // Desktop
                  onTouchStart={() => handleTouch(product)} // Mobile
                />

                {/* Botão de Favoritar */}
                <button
                  data-testid="favorite-button"
                  className={`heart-btn ${isFavorite ? "active" : ""}`}
                  onClick={() => handleFavoriteClick(product)}
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
              <p>{product.price}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Collection_ID;
