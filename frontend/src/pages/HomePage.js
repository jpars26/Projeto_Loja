// src/pages/HomePage.js
import React from 'react';
import Hero from "../components/sections/Hero";
import Services from '../components/sections/Services';
import ContactForm from '../components/ContactForm';
import WhatsAppButton from '../components/WhatsAppButton';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Layout from "../layout/Layout";
import InstagramWidget from "../components/InstagramWidget";
import { Helmet } from "react-helmet";
import Sections from '../components/sections/Sections';



import '../css/HomePage.css';

const HomePage = () => {
  return (
    
    <Layout>
         {/* SEO para a página Home */}
        <Helmet>
          <title>Iara Noivas - Vestidos de Noiva Exclusivos</title>
          <meta name="description" content="Os vestidos de noiva mais sofisticados para seu casamento dos sonhos." />
          <meta property="og:title" content="Iara Noivas - Vestidos de Noiva" />
          <meta property="og:description" content="Confira nossa coleção exclusiva de vestidos de noiva." />
          <meta property="og:url" content="https://www.iaranoivas.com" />
          <meta property="og:type" content="website" />
        </Helmet>
        <Hero />
        <Sections />
        <Services />
        <InstagramWidget />
        <WhatsAppButton />
      
    </Layout>
  );
};

export default HomePage;
