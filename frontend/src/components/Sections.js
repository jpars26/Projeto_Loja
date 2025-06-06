// src/components/sections/Sections.js
import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaQuoteLeft, FaStar } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../css/Sections.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import testimonials from "../data/testimonials";
import collectionsHomePage from "../data/collectionsHomePage";

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
    fade: false,
    arrows: false,
  };

  // Lista com os diferenciais e links de WhatsApp com mensagens personalizadas
  const differentials = [
    {
      title: "Feitos Sob Medida",
      desc: "Temos o serviço de confecção para você que procura algo exclusivo",
      whatsappMessage: "Olá, estou interessada no serviço de confecção sob medida da Iara Noivas. Pode me passar mais informações?",
    },
    {
      title: "Materiais de Alta Qualidade",
      desc: "Usamos os tecidos mais sofisticados para garantir luxo e conforto.",
      whatsappMessage: "Olá, gostaria de saber mais sobre os vestidos da Iara Noivas. Pode me contar mais?",
    },
    {
      title: "Atendimento Personalizado",
      desc: "Nossa equipe ajuda você em cada etapa para escolher o vestido perfeito.",
      whatsappMessage: "Olá, gostaria de agendar um atendimento personalizado para me ajudar a escolher meu vestido. Vocês podem me ajudar?",
    }
  ];

  // Função para gerar link do WhatsApp com mensagem
  const getWhatsAppLink = (message) => {
    const phoneNumber = "5535998127656"; // Seu número com DDD
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <div className="sections" data-testid="diferencial-section">
      {/* 📌 Bloco Diferenciais */}
      <section className="differentials">
        <h2>Por que Escolher a Iara Noivas?</h2>
        <div className="container">
          <div className="differential-grid">
            {differentials.map((item, index) => (
              <a 
                key={index}
                href={getWhatsAppLink(item.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="differential-card-link"
              >
                <div className="differential-card">
                  <FaCheckCircle className="icon" />
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* O restante do seu código (carrossel, depoimentos e CTA final) permanece igual */}
      {/* 📌 Bloco Produtos e Depoimentos lado a lado */}
      <section className="dual-section" data-testid="dual-section">
        <div className="container">
          <div className="dual-content">
            <div className="exclusive-dresses">
              <h2>Descubra Nossos Vestidos Exclusivos</h2>
              <FaStar className="section-icon" />
              <p className="section-subtitle">Modelos feitos para tornar seu dia ainda mais especial.</p>

              <div className="carousel-wrapper">
                <Slider {...sliderSettings} className="exclusive-slider">
                  {collectionsHomePage.map((collection, index) => (
                    <div key={index} className="exclusive-slide">
                      <LazyLoadImage src={collection.image} alt={collection.name} className="exclusive-image" />
                      <p className="collection-name">{collection.name}</p>
                    </div>
                  ))}
                </Slider>
              </div>

              <Link to="/collections">
                <button className="cta-button">Ver Coleção</button>
              </Link>
            </div>

            <div className="testimonials" data-testid="testimonials-section">
              <h2>Sonhos que Viraram Realidade</h2>
              <FaQuoteLeft className="section-icon" />
              <p className="section-subtitle">Nossas noivas contam suas histórias inesquecíveis.</p>

              <div className="carousel-wrapper">
                <Slider {...sliderSettings} className="testimonial-slider">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-box">
                      <LazyLoadImage src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                      <p className="testimonial-text">{testimonial.text}</p>
                      <h4 className="testimonial-name">- {testimonial.name}</h4>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📌 Bloco CTA Final */}
      <section className="cta" data-testid="cta-section">
        <div className="container">
          <h2>Pronta para Encontrar o Vestido dos Seus Sonhos?</h2>
          <p>Entre em contato e agende uma consultoria exclusiva.</p>
          <a href="https://wa.me/+5535998127656" target="_blank" rel="noopener noreferrer">
            <button className="agd-button">Agendar Atendimento</button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Sections;
