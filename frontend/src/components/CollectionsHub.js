// src/components/CollectionsHub.js
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import collectionsHub from "../data/collectionsHub";
import { useReveal } from "../hooks/useReveal";

const ACCENT_CLASSES = {
  noivas: "bg-noivas",
  ternos: "bg-ternos",
  festa: "bg-festa",
};

const CollectionsHub = () => {
  const revealRef = useReveal();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
      <h1 className="font-display text-3xl font-medium text-ink sm:text-4xl">
        Encontre o look perfeito para o seu momento
      </h1>
      <p className="mx-auto mt-4 max-w-xl font-body text-sm text-ink/70 sm:text-base">
        Descubra nossas coleções e encontre o visual ideal para uma ocasião inesquecível.
      </p>

      <div ref={revealRef} className="mt-12 grid grid-cols-1 gap-8 text-left lg:grid-cols-3">
        {collectionsHub.map((item) => (
          <Link
            key={item.slug}
            to={`/collections/${item.slug}`}
            className="group block border border-hairline bg-surface transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
          >
            <span aria-hidden="true" className={`block h-1 w-full ${ACCENT_CLASSES[item.slug]}`} />

            <div className="relative aspect-[4/5] overflow-hidden">
              <LazyLoadImage
                effect="blur"
                src={item.image}
                alt={item.imageAlt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                wrapperClassName="block h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
            </div>

            <div className="p-6">
              <h2 className="font-display text-xl font-medium text-ink">{item.title}</h2>
              <p className="mt-2 font-body text-sm text-ink/70">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 font-label text-xs uppercase tracking-wide text-accent transition-transform duration-300 group-hover:translate-x-1">
                {item.ctaLabel}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionsHub;
