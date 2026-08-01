import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import collections from "../data/catalog";
import logo from "../assets/images/loguinho.webp";
import FabricTag from "./FabricTag";
import { useReveal } from "../hooks/useReveal";

const BUTTON_LABEL_BY_CATEGORY = {
  noivas: "Ver Vestidos",
  ternos: "Ver Ternos",
  festa: "Ver Looks de Festa",
};

const CollectionGrid = ({ category = "noivas" }) => {
  const buttonLabel = BUTTON_LABEL_BY_CATEGORY[category] ?? "Ver Coleção";
  const filtered = collections.filter((dress) => dress.category === category);
  const revealRef = useReveal();

  return (
    <section ref={revealRef} className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6">
      <LazyLoadImage
        src={logo}
        alt="Coleção Exclusiva"
        className="mx-auto max-h-24 w-auto"
      />
      <h2 className="mt-4 font-display text-2xl font-medium text-ink sm:text-3xl">
        Coleção Exclusiva
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((dress) => (
          <Link
            key={dress.id}
            to={`/collections/${dress.id}`}
            className="group relative block aspect-[3/4] overflow-hidden bg-surface"
          >
            <LazyLoadImage
              effect="blur"
              src={dress.image}
              alt={dress.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              wrapperClassName="h-full w-full block"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-3 left-3 flex flex-col items-start gap-1 opacity-100 translate-y-0 transition-all duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
              <FabricTag tint={category} className="bg-surface/95">
                {dress.name}
              </FabricTag>
              <FabricTag className="bg-surface/95">{buttonLabel}</FabricTag>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionGrid;
