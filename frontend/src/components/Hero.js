import { useState } from "react";
import { Link } from "react-router-dom";
import heroVideoWebm from "../assets/videos/videoCerto.webm";
import heroVideoMp4 from "../assets/videos/videoLoja.mp4";
import { useParallax } from "../hooks/useParallax";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const parallaxRef = useParallax({ distance: 60 });

  return (
    <section
      className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink sm:min-h-[85vh]"
      data-testid="hero-section"
    >
      <video
        ref={parallaxRef}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className={`absolute inset-0 h-full w-full scale-110 object-cover object-[center_20%] transition-opacity duration-700 sm:object-center ${
          isLoaded ? "opacity-90" : "opacity-0"
        }`}
      >
        <source src={heroVideoWebm} type="video/webm" />
        <source src={heroVideoMp4} type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

      <div className="relative z-10 max-w-xl px-6 pb-14 sm:px-12 sm:pb-20">
        <p className="font-label text-xs uppercase tracking-[0.2em] text-bone/80">
          Iara Noivas
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-tight text-bone sm:text-5xl">
          Há mais de 20 anos contando histórias através de vestidos
        </h1>
        <p className="mt-4 max-w-md font-body text-sm text-bone/80 sm:text-base">
          Noivas, ternos e vestidos de festa em coleções exclusivas, feitos para o seu grande dia.
        </p>
        <Link
          to="/collections"
          className="mt-6 inline-block border border-bone px-5 py-2 font-label text-xs uppercase tracking-wide text-bone transition-colors hover:bg-bone hover:text-ink"
        >
          Ver Coleção
        </Link>
      </div>
    </section>
  );
};

export default Hero;
