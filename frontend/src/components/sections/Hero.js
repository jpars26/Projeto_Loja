// src/components/sections/Hero.js
import React from "react";
import "../../css/Hero.css";
import heroVideo from "../../assets/videos/videoCerto.MOV"; // Importando o vídeo
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      {/* Vídeo de fundo */}
      <video autoPlay loop muted playsInline className="hero-video">
        <source src={heroVideo} type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>
      {/* Conteúdo sobreposto */}
        <div className="hero-content">
          <Link to='/collections'>
          <button className="cta-button">Ver Coleção</button>
          </Link>
          
        </div>

    </section>
  );
};

export default Hero;
