// src/components/sections/Hero.js

import "../css/Hero.css";
import { useState } from "react";

const heroVideoWebm = require('../assets/videos/videoCerto.webm');

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <section className="hero" data-testid="hero-section">
       {/* Vídeo de fundo otimizado */}
       <video
        autoPlay
        loop
        muted
        playsInline
        className={`hero-video ${isLoaded ? "loaded" : ""}`}  
        onLoadedData={() => setIsLoaded(true)} // Quando o vídeo carregar, remove o efeito de fade
      >
        <source src={heroVideoWebm} type="video/webm" />
        
        Seu navegador não suporta vídeos.
      </video>
      

    </section>
  );
};

export default Hero;
