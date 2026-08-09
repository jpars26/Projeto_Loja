import { useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaHeart, FaShareAlt, FaWhatsapp, FaThumbsUp } from "react-icons/fa";
import { useMoodboard } from "../context/MoodboardContext";
import { shareCurrentPage } from "../utils/shareCurrentPage";
import { shareSingleDress } from "../utils/shareSingleDress";
import FabricTag from "./FabricTag";

const ProductCard = ({ product }) => {
  const { moodboardItems, addToMoodboard, removeFromMoodboard } = useMoodboard();
  const [justLiked, setJustLiked] = useState(false);
  const lastTapRef = useRef(0);

  const isFavorite = moodboardItems.some((item) => item.id === product.id);

  const handleFavoriteClick = (event) => {
    event?.stopPropagation();
    if (isFavorite) {
      removeFromMoodboard(product.id);
      return;
    }
    addToMoodboard(product);
    setJustLiked(true);
    setTimeout(() => setJustLiked(false), 1000);
  };

  const handleTouchStart = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      handleFavoriteClick();
    }
    lastTapRef.current = now;
  };

  return (
    <div className="group text-center" onTouchStart={handleTouchStart}>
      <div className="relative aspect-[3/4] overflow-hidden bg-hairline/30">
        <LazyLoadImage
          effect="blur"
          src={product.image}
          loading="lazy"
          alt={product.name}
          className="h-full w-full object-cover"
          wrapperClassName="block h-full w-full"
        />

        <button
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 transition-colors hover:bg-surface ${
            isFavorite ? "text-accent" : "text-ink"
          }`}
          onClick={handleFavoriteClick}
          aria-label="Favoritar"
        >
          <FaHeart size={16} />
        </button>

        {justLiked && (
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
          onClick={handleFavoriteClick}
          aria-label="Curtir"
        >
          <FaThumbsUp size={16} />
        </button>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-[#25D366] transition-colors hover:border-[#25D366]"
          onClick={(event) => {
            event.stopPropagation();
            shareSingleDress(product.name);
          }}
          aria-label="Compartilhar no WhatsApp"
        >
          <FaWhatsapp size={16} />
        </button>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-accent hover:text-accent"
          onClick={(event) => {
            event.stopPropagation();
            shareCurrentPage();
          }}
          aria-label="Compartilhar"
        >
          <FaShareAlt size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
