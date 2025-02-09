// src/components/sections/Hero.js
import React from "react";
import "../../css/Hero.css";
import heroVideo from "../../assets/videos/videoCerto.MOV"; // Importando o vídeo
import heroVideoWebm from "../../assets/videos/videoCerto.webm"; // Importando o vídeo
import { Link } from "react-router-dom";
import { useState } from "react";

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
        <source src={heroVideo} type="video/mov" />
        Seu navegador não suporta vídeos.
      </video>
      {/* Conteúdo sobreposto
        <div className="hero-content">
          <Link to='/collections'>
          <button className="cta-button">Ver Coleção</button>
          </Link>
          
        </div> */}

    </section>
  );
};

export default Hero;
