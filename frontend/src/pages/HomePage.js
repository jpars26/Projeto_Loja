// src/pages/HomePage.js
import React from 'react';
import Hero from "../components/sections/Hero";
import AboutUs from '../components/sections/AboutUs';
import Services from '../components/sections/Services';
import ContactForm from '../components/ContactForm';
import WhatsAppButton from '../components/WhatsAppButton';
import Header from '../components/Header';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import '../css/HomePage.css';

const HomePage = () => {
  return (
       <div>
      <Header />
      <Hero />
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
