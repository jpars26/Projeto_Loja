import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import collections from "../data/catalog";
import { useMoodboard } from "../context/MoodboardContext";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaHeart, FaShareAlt, FaWhatsapp, FaThumbsUp } from "react-icons/fa";
import { shareCurrentPage } from "../utils/shareCurrentPage";
import { shareSingleDress } from "../utils/shareSingleDress";
import FabricTag from "../components/FabricTag";
import { useParallax } from "../hooks/useParallax";

const Collection_ID = () => {
  const { slug: id } = useParams();
  const collection = collections.find((col) => col.id === id);
  const { moodboardItems, addToMoodboard, removeFromMoodboard } = useMoodboard();
  const gridRef = useRef(null);
  const bannerParallaxRef = useParallax({ distance: 40 });
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
    return <h2 className="p-10 text-center font-display text-2xl text-ink">Coleção não encontrada!</h2>;
  }

  return (
    <Layout title={collection.name}>
      <Helmet>
        <title>Iara Noivas - Vestidos de Noiva </title>
      </Helmet>

      <div className="mx-auto max-w-6xl px-4 pt-8 text-center sm:px-6">
        <h1 className="sr-only">{collection.name}</h1>
        <img
          ref={bannerParallaxRef}
          src={collection.banner}
          loading="lazy"
          alt={collection.name}
          className="mx-auto max-h-64 w-auto object-contain"
        />
        <p className="mt-4 font-body text-sm text-ink/70 sm:text-base">
          Explore nossa coleção exclusiva {collection.name}.
        </p>
      </div>

      {/* Grid de Produtos */}
      <div
        ref={gridRef}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3"
      >
        {collection.products.map((product) => {
          const isFavorite = moodboardItems.some((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              className="group text-center"
              onTouchStart={() => handleTouchStart(product)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-hairline/30">
                <LazyLoadImage
                  effect="blur"
                  src={product.image}
                  loading="lazy"
                  alt={product.name}
                  className="h-full w-full object-cover"
                  wrapperClassName="block h-full w-full"
                />

                {/* Ícone de Favoritar sobre a Imagem */}
                <button
                  className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-ink transition-colors hover:bg-surface ${
                    isFavorite ? "text-accent" : ""
                  }`}
                  onClick={(e) => handleFavoriteClick(product, e)}
                  aria-label="Favoritar"
                >
                  <FaHeart size={16} />
                </button>

                {/* Efeito de coração subindo */}
                {likedItems[product.id] && (
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 animate-float-up text-2xl text-accent">
                    <FaHeart />
                  </span>
                )}
              </div>

              <div className="mt-3 flex justify-center">
                <FabricTag>{product.name}</FabricTag>
              </div>

              <div className="mt-3 flex justify-center gap-3">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-accent hover:text-accent"
                  onClick={(e) => handleFavoriteClick(product, e)}
                  aria-label="Curtir"
                >
                  <FaThumbsUp size={16} />
                </button>

                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-[#25D366] transition-colors hover:border-[#25D366]"
                  data-name={product.name}
                  onClick={shareSingleDress}
                  aria-label="Compartilhar no WhatsApp"
                >
                  <FaWhatsapp size={16} />
                </button>

                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-accent hover:text-accent"
                  onClick={() => shareCurrentPage()}
                  aria-label="Compartilhar"
                >
                  <FaShareAlt size={16} />
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
