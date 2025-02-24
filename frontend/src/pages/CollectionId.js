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
import tourSteps from "../utils/TourSteps"; // Importando os steps
import { startTour } from "../utils/TourGuide"; // Importando TourGuide

const Collection_ID = () => {
  const { id } = useParams(); 
  const collection = collections.find(col => col.id === id);
  const { moodboardItems, addToMoodboard, removeFromMoodboard } = useMoodboard();
  const gridRef = useRef(null);
  const [likedItems, setLikedItems] = useState({});

  // Inicia o tour ao carregar a página (somente na primeira visita)
  useEffect(() => {
    if (!localStorage.getItem("tourCollectionViewed")) {
      startTour("collection", tourSteps.collection);
      localStorage.setItem("tourCollectionViewed", "true");
    }
  }, []);

  // Função para ativar/desativar o favorito
  const handleFavoriteClick = (product, event) => {
    event.stopPropagation(); // Evita conflito com outros eventos de clique
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

  if (!collection) {
    return <h2>Coleção não encontrada!</h2>;
  }

  return ( 
    <Layout title={collection.name}>
      <Helmet>
        <title>{collection.name} - Vestidos de Noiva | Iara Noivas</title>
      </Helmet>
      
      <img effect="blur" src={collection.banner} loading="lazy" alt={collection.name} className="collection-banner" />
      <p className="textoCollection">Explore nossa coleção exclusiva {collection.name}.</p>
      

      {/* Grid de Produtos */}
      <div className="product-grid" ref={gridRef}>
        {collection.products.map(product => {
          const isFavorite = moodboardItems.some(item => item.id === product.id);
          const tooltipId = `tooltip-share-${product.id}`;
          const whatsappTooltipId = `tooltip-whatsapp-${product.id}`;
          const likeTooltipId = `tooltip-like-${product.id}`;

          return (
            <div key={product.id} className="product-card hidden">
              <div className="image-container">
                <LazyLoadImage effect="blur" src={product.image} loading="lazy" alt={product.name} />

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
                {/* Botão de Curtir */}
                <button className="btnCurtir" data-tooltip-id={likeTooltipId} onClick={(e) => handleFavoriteClick(product, e)}>
                  <FaThumbsUp size={20}/>
                </button>
              
                
                {/* Botão de Compartilhar Wpp */}
                <button 
                  className="btnCompartilharWpp" 
                  data-tooltip-id={whatsappTooltipId}
                  data-name={product.name}
                  onClick={shareSingleDress}
                >
                  <FaWhatsapp /> 
                </button>
               
                
                {/* Botão de Compartilhar */}     
                <button className="btnCompartilhar" data-tooltip-id={tooltipId} onClick={() => shareCurrentPage()}>
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
