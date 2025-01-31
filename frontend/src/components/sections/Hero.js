// src/components/sections/Hero.js
import React from "react";
import "../../css/Hero.css";
import heroVideo from "../../assets/videos/videoCerto.MOV"; // Importando o vídeo

const Hero = () => {
  return (
    <section className="hero">
      {/* Vídeo de fundo */}
      <video autoPlay loop muted playsInline className="hero-video">
        <source src={heroVideo} type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      {/* Conteúdo sobreposto */}
      {/* <div className="hero-content">
        <h1>Aluguel de Vestidos de Noiva</h1>
        <p>Encontre o vestido dos seus sonhos para o grande dia</p>
        <button className="cta-button">Ver Coleção</button>
      </div> */}
    </section>
  );
};

export default Hero;
