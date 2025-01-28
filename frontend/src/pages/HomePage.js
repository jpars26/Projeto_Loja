// src/pages/HomePage.js
import React from 'react';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import ContactForm from '../components/ContactForm';
import WhatsAppButton from '../components/WhatsAppButton';
import Header from '../components/Header';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import '../css/HomePage.css';

const HomePage = () => {
  return (
       <div>
      <Header />
      <button>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Voltar para a Loja
        </Link>
        </button>
      <AboutUs />
      
      <Services />
      <ContactForm />
      <WhatsAppButton />
      
      <footer>
        <p>&copy; 2025 Loja de Roupas para Eventos</p>
      </footer>
    </div>
  );
};

export default HomePage;
