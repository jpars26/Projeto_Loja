import { useMoodboard } from "../context/MoodboardContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaWhatsapp, FaShareAlt } from "react-icons/fa";
import { shareFavorites } from "../utils/shareFavorites";
import { shareOnWhatsApp } from "../utils/shareOnWhatsApp";
import FabricTag from "./FabricTag";

const Moodboard = () => {
  const { moodboardItems, removeFromMoodboard } = useMoodboard();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
      <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">Meu Favorito</h2>
      {moodboardItems.length === 0 ? (
        <p className="mt-6 font-body text-sm text-ink/70">
          Você ainda não adicionou nada a sua lista de favoritos.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {moodboardItems.map((item) => (
            <div key={item.id} className="text-center">
              <div className="aspect-[3/4] overflow-hidden bg-hairline/30">
                <LazyLoadImage
                  effect="blur"
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  wrapperClassName="block h-full w-full"
                />
              </div>
              <div className="mt-3 flex justify-center">
                <FabricTag>{item.name}</FabricTag>
              </div>
              <div className="mt-3 flex justify-center gap-3">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-accent hover:text-accent"
                  onClick={() => removeFromMoodboard(item.id)}
                  aria-label="Remover dos favoritos"
                >
                  ✕
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-[#25D366] transition-colors hover:border-[#25D366]"
                  onClick={() => shareOnWhatsApp(moodboardItems)}
                  aria-label="Compartilhar no WhatsApp"
                >
                  <FaWhatsapp size={16} />
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-accent hover:text-accent"
                  onClick={() => shareFavorites(moodboardItems)}
                  aria-label="Compartilhar"
                >
                  <FaShareAlt size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Moodboard;
