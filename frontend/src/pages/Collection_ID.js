import React, { useEffect, useRef } from "react";
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
  const gridRef = useRef(null); // Referência para a grid de produtos

  // 🚀 Animação com Intersection Observer (MOVIDO PARA O TOPO)
  useEffect(() => {
    if (!collection) return; // Evita erros caso a coleção não exista

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.3 } // Ativa quando 30% do item aparece na tela
    );

    const items = gridRef.current?.querySelectorAll(".product-card");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [collection]); // 🚀 Agora depende de "collection" para garantir que não rode se for indefinida

  if (!collection) {
    return <h2>Coleção não encontrada!</h2>;
  }

  return ( 
    <Layout title={collection.name}>
      <Helmet>
        <title>{collection.name} - Vestidos de Noiva | Iara Noivas</title>
        <meta name="description" content={`Veja detalhes do vestido ${collection.name}, perfeito para o seu casamento.`} />
        <meta property="og:title" content={`${collection.name} - Vestidos de Noiva`} />
        <meta property="og:description" content={`Conheça o vestido ${collection.name} e veja como ele pode ser o ideal para você.`} />
        <meta property="og:url" content={`https://www.iaranoivas.com/collections/${collection.id}`} />
        <meta property="og:type" content="product" />
      </Helmet>
      
      <img effect="blur" src={collection.banner} loading="lazy" alt={collection.name} className="collection-banner" />
      <p>Explore nossa coleção exclusiva {collection.name}.</p>

      {/* Grid de Produtos */}
      <div className="product-grid" ref={gridRef}>
        {collection.products.map(product => {
          const isFavorite = moodboardItems.some(item => item.id === product.id);

          return (
            <div key={product.id} className="product-card hidden">
              <LazyLoadImage effect="blur" src={product.image} loading="lazy" alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>

              {/* Botão de Favoritar */}
              <button
                data-testid="favorite-button"
                className={`heart-btn ${isFavorite ? "active" : ""}`}
                onClick={() => isFavorite ? removeFromMoodboard(product.id) : addToMoodboard(product)}
              >
                <FaHeart />
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Collection_ID;
