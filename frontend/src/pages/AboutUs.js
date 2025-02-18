import React from 'react';
import CustomerGallery from '../components/CustomerGallery';
import Layout from '../layout/Layout';
import { Helmet } from "react-helmet";
import { FaCheckCircle, FaClock, FaStar } from "react-icons/fa";
import "../css/AboutUs.css"; // Certifique-se de criar esse CSS para estilizar
import logo from "../assets/images/loguinho.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";


const AboutUs = () => {
  return (
    <Layout>
      {/* SEO para a página Sobre Nós */}
      <Helmet>
        <title>Sobre Nós - Iara Noivas</title>
        <meta
          name="description"
          content="Conheça a história da Iara Noivas e nossa paixão por criar vestidos de noiva inesquecíveis."
        />
        <meta property="og:title" content="Sobre Nós - Iara Noivas" />
        <meta
          property="og:description"
          content="Descubra como a Iara Noivas se tornou referência em vestidos de casamento sofisticados e elegantes."
        />
        <meta property="og:url" content="https://www.iaranoivas.com/about" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Seção Hero */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Realizamos sonhos, um vestido por vez</h1>
          <p>Transformamos momentos especiais em memórias inesquecíveis.</p>
        </div>
      </section>

      {/* Nossa História - Timeline */}
      <section className="about-history">
        <h2>Nossa História</h2>
        <div className="history-timeline">
          <div className="timeline-item">
            <span className="year">2003</span>
            <p>Fundação da Iara Noivas, inspirada pelo amor à moda nupcial.</p>
          </div>
          <div className="timeline-item">
            <span className="year">2010</span>
            <p>Começamos a criar vestidos sob medida, exclusivos para cada noiva.</p>
          </div>
          <div className="timeline-item">
            <span className="year">2020</span>
            <p>Nossas peças se tornaram referência em casamentos de luxo.</p>
          </div>
          <div className="timeline-item">
            <span className="year">2024</span>
            <p>Expandimos para novas coleções exclusivas.</p>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="about-differentials">
        <h2>Por que escolher a Iara Noivas?</h2>
        <div className="differentials-grid">
          <div className="differential-card">
            <FaCheckCircle className="icon" />
            <h3>Feitos Sob Medida</h3>
            <p>Cada vestido é desenhado para refletir sua personalidade e estilo.</p>
          </div>
          <div className="differential-card">
            <FaClock className="icon" />
            <h3>22 Anos de Tradição</h3>
            <p>Mais de 5.000 noivas já confiaram em nossa experiência.</p>
          </div>
          <div className="differential-card">
            <FaStar className="icon" />
            <h3>Qualidade e Exclusividade</h3>
            <p>Utilizamos os melhores materiais para criar peças atemporais.</p>
          </div>
        </div>
      </section>

      {/* Galeria de Clientes */}
      <section className="about-gallery">
        <h2>Noivas Felizes</h2>
        <LazyLoadImage src={logo} alt="Coleção Exclusiva" className="collection-banner" />
        <CustomerGallery />
      </section>


      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <h2>Pronta para Encontrar o Vestido dos Seus Sonhos?</h2>
          <p>Entre em contato e agende uma consultoria exclusiva.</p>
          <a href="https://wa.me/+5535998289198" target="_blank" rel="noopener noreferrer">
            <button className="cta-button">Agendar Atendimento</button>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
