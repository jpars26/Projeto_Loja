// src/components/sections/Sections.js
import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaQuoteLeft, FaStar } from "react-icons/fa"
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../../css/Sections.css";

import Slider from "react-slick"; // Importação do carrossel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import aboutImage from "../../assets/images/banner.jpg"; 
import vestido1 from "../../assets/images/IMG_2986.JPG";
import testimonials from "../../data/testimonials"; // Importando os depoimentos

const Sections = () => {
  // Configurações do carrossel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
  };

  return (
    <div className="sections">
      {/* 📌 Bloco Diferenciais */}
      <section className="differentials">
        <div className="container">
          <h2>Por que Escolher a Iara Noivas?</h2>
          <div className="differential-grid">
            {[
              { title: "Feitos Sob Medida", desc: "Cada vestido é exclusivo e desenhado para sua personalidade." },
              { title: "Materiais de Alta Qualidade", desc: "Usamos os tecidos mais sofisticados para garantir luxo e conforto." },
              { title: "Atendimento Personalizado", desc: "Nossa equipe ajuda você em cada etapa para escolher o vestido perfeito." },
            ].map((item, index) => (
              <div key={index} className="differential-card">
                <FaCheckCircle className="icon"/>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sections">
      {/* 📌 Bloco Produtos e Depoimentos lado a lado */}
      <section className="dual-section">
        <div className="container">
          <div className="dual-content">
            {/* 📌 Bloco Descubra Nossos Vestidos Exclusivos */}
            <div className="exclusive-dresses">
              <h2>Descubra Nossos Vestidos Exclusivos</h2>
              <FaStar className="section-icon" />  {/* Ícone no topo */}
              <p className="section-subtitle">Modelos feitos para tornar seu dia ainda mais especial.</p>
              <LazyLoadImage src={vestido1} alt="Vestido Exclusivo" className="exclusive-image"/>
              <Link to="/collections">
                <button className="cta-button">Ver Coleção</button>
              </Link>
            </div>

            {/* 📌 Bloco Depoimentos com Carrossel */}
            <div className="testimonials">
              <h2>Sonhos que Viraram Realidade</h2>
              <FaQuoteLeft className="section-icon" />  {/* Ícone no topo */}
              <p className="section-subtitle">Nossas noivas contam suas histórias inesquecíveis.</p>
              <Slider {...sliderSettings} className="testimonial-slider">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="testimonial-box">
                    <LazyLoadImage src={testimonial.image} alt={testimonial.name} className="testimonial-image"/>
                    <p>{testimonial.text}</p>
                    <h4>- {testimonial.name}</h4>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </div>

      {/* 📌 Bloco CTA Final */}
      <section className="cta">
        <div className="container">
          <h2>Pronta para Encontrar o Vestido dos Seus Sonhos?</h2>
          <p>Entre em contato e agende uma consultoria exclusiva.</p>
          <a href="https://wa.me/seu-numero" target="_blank" rel="noopener noreferrer">
            <button className="cta-button">Agendar Atendimento</button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Sections;
