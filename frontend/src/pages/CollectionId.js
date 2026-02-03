// src/pages/Collection_ID.js
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import collections from "../data/collections";
import "../css/Collection_ID.css";
import { useMoodboard } from "../context/MoodboardContext";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaHeart, FaShareAlt, FaWhatsapp, FaThumbsUp } from "react-icons/fa";
import { shareCurrentPage } from "../utils/shareCurrentPage";
import { shareSingleDress } from "../utils/shareSingleDress";


const Collection_ID = () => {
  const { id } = useParams();
  const collection = collections.find((col) => col.id === id);
  const { moodboardItems, addToMoodboard, removeFromMoodboard } = useMoodboard();
  const gridRef = useRef(null);
  const [likedItems, setLikedItems] = useState({});
  const lastTapRef = useRef(0); // Controla o último toque para double tap


  const handleFavoriteClick = (product, event) => {
    event?.stopPropagation(); // Protege para casos de chamada manual
    const isFavorite = moodboardItems.some((item) => item.id === product.id);

    if (isFavorite) {
      removeFromMoodboard(product.id);
    } else {
      addToMoodboard(product);
      setLikedItems((prev) => ({ ...prev, [product.id]: true }));

      setTimeout(() => {
        setLikedItems((prev) => ({ ...prev, [product.id]: false }));
      }, 1000);
    }
  };

  const handleTouchStart = (product) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // 300ms para detectar double tap
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      handleFavoriteClick(product);
    }
    lastTapRef.current = now;
  };

  if (!collection) {
    return <h2>Coleção não encontrada!</h2>;
  }

  return (
    <Layout title={collection.name}>
      <Helmet>
        <title>Iara Noivas - Vestidos de Noiva </title>
      </Helmet>

      <img
        effect="blur"
        src={collection.banner}
        loading="lazy"
        alt={collection.name}
        className="collection-banner"
      />
      <p className="textoCollection">Explore nossa coleção exclusiva {collection.name}.</p>

      {/* Grid de Produtos */}
      <div className="product-grid" ref={gridRef}>
        {collection.products.map((product) => {
          const isFavorite = moodboardItems.some((item) => item.id === product.id);
          const tooltipId = `tooltip-share-${product.id}`;
          const whatsappTooltipId = `tooltip-whatsapp-${product.id}`;
          const likeTooltipId = `tooltip-like-${product.id}`;

          return (
            <div
              key={product.id}
              className="product-card hidden"
              onTouchStart={() => handleTouchStart(product)}
            >
              <div className="image-container">
                <LazyLoadImage
                  effect="blur"
                  src={product.image}
                  loading="lazy"
                  alt={product.name}
                />

                {/* Ícone de Favoritar sobre a Imagem */}
                <button
                  className={`heart-btn ${isFavorite ? "active" : ""}`}
                  onClick={(e) => handleFavoriteClick(product, e)}
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

              <div className="share-buttons-container">
                <button
                  className="btnCurtir"
                  data-tooltip-id={likeTooltipId}
                  onClick={(e) => handleFavoriteClick(product, e)}
                >
                  <FaThumbsUp size={20} />
                </button>

                <button
                  className="btnCompartilharWpp"
                  data-tooltip-id={whatsappTooltipId}
                  data-name={product.name}
                  onClick={shareSingleDress}
                >
                  <FaWhatsapp />
                </button>

                <button
                  className="btnCompartilhar"
                  data-tooltip-id={tooltipId}
                  onClick={() => shareCurrentPage()}
                >
                  <FaShareAlt />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Collection_ID;
