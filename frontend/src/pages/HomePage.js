// src/pages/HomePage.js
import React from 'react';
import Hero from "../components/sections/Hero";
import AboutUs from '../components/sections/AboutUs';
import Services from '../components/sections/Services';
import ContactForm from '../components/ContactForm';
import WhatsAppButton from '../components/WhatsAppButton';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      <script src="https://static.elfsight.com/platform/platform.js" async></script>
      <div class="elfsight-app-2c2957ef-1f19-4bfd-94d3-3efdfb5c1b31" data-elfsight-app-lazy></div>
      <WhatsAppButton />
      
      <Footer />  {/* ✅ Adicione o Footer aqui */}
    </div>
  );
};

export default HomePage;
