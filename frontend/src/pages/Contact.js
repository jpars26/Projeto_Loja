import React from "react";
import { Helmet } from "react-helmet";
import ContactForm from "../components/ContactForm";
import Layout from "../layout/Layout";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import "../css/Contact.css";

const Contact = () => {
    return (
        <Layout>
            {/* 🔹 SEO para melhor indexação */}
            <Helmet>
                <title>Fale Conosco - Iara Noivas</title>
                <meta name="description" content="Entre em contato para saber mais sobre nossos vestidos de noiva e agendar um atendimento personalizado." />
                <meta property="og:title" content="Fale Conosco - Iara Noivas" />
                <meta property="og:description" content="Envie uma mensagem e fale diretamente com nossa equipe." />
                <meta property="og:url" content="https://www.iaranoivas.com/contact" />
                <meta property="og:type" content="website" />
            </Helmet>

            {/* 🔹 Hero Section com imagem impactante */}
            <section className="contact-hero">
                <h1>Vamos Conversar? 💍</h1>
                <p>Estamos prontos para ajudar você a encontrar o vestido perfeito!</p>
                <a href="https://wa.me/SEUNUMERO" target="_blank" rel="noopener noreferrer" className="whatsapp-button">
                    <FaWhatsapp /> Fale Conosco no WhatsApp
                </a>
            </section>

            {/* 🔹 Seção de Informações de Contato */}
            <section className="contact-info">
                <div className="contact-card">
                    <FaPhone className="contact-icon" />
                    <h3>Telefone / WhatsApp</h3>
                    <p>(35) 99828-9198</p>
                </div>
                <div className="contact-card">
                    <FaEnvelope className="contact-icon" />
                    <h3>E-mail</h3>
                    <p>iaranoivas2023@gmail.com</p>
                </div>
                <div className="contact-card">
                    <FaMapMarkerAlt className="contact-icon" />
                    <h3>Endereço</h3>
                    <p>Rua Doutor Lisboa, Nº 231 – Pouso Alegre, MG</p>
                </div>
            </section>

            {/* 🔹 Formulário de Contato */}
            <section className="contact-form-section">
                <h2>Envie uma Mensagem</h2>
                <p>Preencha o formulário abaixo e retornaremos o mais rápido possível.</p>
                <ContactForm />
            </section>

            {/* 🔹 Seção de Perguntas Frequentes */}
            <section className="faq-section">
                <h2>❔ Dúvidas Frequentes</h2>
                <div className="faq-item">
                    <h3>📅 Como agendar uma prova de vestido?</h3>
                    <p>Entre em contato pelo WhatsApp ou pelo formulário para marcar um horário com nossa equipe.</p>
                </div>
                <div className="faq-item">
                    <h3>💳 Quais formas de pagamento são aceitas?</h3>
                    <p>Trabalhamos com cartão de crédito, PIX e parcelamento especial para noivas.</p>
                </div>
                <div className="faq-item">
                    <h3>⏰ Preciso marcar horário para atendimento?</h3>
                    <p>Não, recomendamos o agendamento para pessoas interessadas em confeccionar seu vestido.</p>
                </div>
            </section>

            {/* 🔹 Mapa Interativo */}
            <section className="contact-map">
                <h2>📍 Nossa Localização</h2>
                <iframe
                    title="Mapa Iara Noivas"
                    src="https://maps.app.goo.gl/4eBKca5fFoD7B7hXA" // Substitua com o link do Google Maps da sua loja
                    width="80%"
                    height="300"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </Layout>
    );
};

export default Contact;
