import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroVideoLandscapeWebm from "../assets/videos/videoCerto.webm";
import heroVideoPortraitMp4 from "../assets/videos/videoLoja-sem-texto.mp4";
import { useParallax } from "../hooks/useParallax";

// Abaixo do breakpoint `sm` do Tailwind (640px), a seção usa o vídeo vertical
// em vez de deixar a escolha por suporte a formato (o que ignoraria a orientação).
const MOBILE_QUERY = "(max-width: 639px)";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
  );
  const parallaxRef = useParallax({ distance: 60 });

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section
      className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink sm:min-h-[85vh]"
      data-testid="hero-section"
    >
      <video
        key={isMobile ? "mobile" : "desktop"}
        ref={parallaxRef}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className={`absolute inset-0 h-full w-full scale-110 object-cover transition-opacity duration-700 ${
          isMobile ? "object-center" : "object-[center_20%] sm:object-center"
        } ${isLoaded ? "opacity-90" : "opacity-0"}`}
      >
        {isMobile ? (
          <source src={heroVideoPortraitMp4} type="video/mp4" />
        ) : (
          <>
            <source src={heroVideoLandscapeWebm} type="video/webm" />
            <source src={heroVideoPortraitMp4} type="video/mp4" />
          </>
        )}
        Seu navegador não suporta vídeos.
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

      <div className="relative z-10 max-w-xl px-6 pb-14 sm:px-12 sm:pb-20">
        <p className="font-label text-xs uppercase tracking-[0.2em] text-bone/80">
          Iara Noivas
        </p>
        <h1 className="mt-3 font-display text-2xl font-medium leading-tight text-bone sm:text-4xl">
          Há mais de 20 anos contando histórias através de vestidos
        </h1>
        <p className="mt-4 max-w-md font-body text-sm text-bone/80 sm:text-base">
          Noivas, ternos e vestidos de festa em coleções exclusivas, feitos para o seu grande dia.
        </p>
        <div className="cta-glow-wrap mt-6">
          <Link
            to="/collections"
            className="inline-block bg-accent px-6 py-3 font-label text-xs uppercase tracking-wide text-bone shadow-lg transition-transform hover:scale-105"
          >
            Ver Coleção
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
