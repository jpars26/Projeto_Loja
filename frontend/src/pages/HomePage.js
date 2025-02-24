// src/pages/HomePage.js
import React, { useEffect } from 'react';
import Hero from "../components/Hero";
import WhatsAppButton from '../components/WhatsAppButton';
import Layout from "../layout/Layout";
import InstagramWidget from "../components/InstagramWidget";
import { Helmet } from "react-helmet";
import Sections from '../components/Sections';
import ContactForm from '../components/ContactForm';
import tourSteps from "../utils/TourSteps";
import { startTour, stopTour, isTourActive } from "../utils/TourGuide"; // Importando Tour
import '../css/HomePage.css';


const HomePage = () => {
  useEffect(() => {
    setTimeout(() => {
      if (!isTourActive()) {
        startTour("home", tourSteps.home);
      }

      return () => {
        stopTour();
      };
    }, 1000);
  }, []);

  return (
    <Layout>
      {/* SEO para a página Home */}
      <Helmet>
        <title>Iara Noivas - Vestidos de Noiva Exclusivos</title>
        <meta name="description" content="Os vestidos de noiva mais sofisticados para seu casamento dos sonhos." />
        <meta property="og:title" content="Iara Noivas - Vestidos de Noiva" />
        <meta property="og:description" content="Confira nossa coleção exclusiva de vestidos de noiva." />
        <meta property="og:url" content="https://www.iaranoivas.com.br" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Hero />
      <Sections />
      <ContactForm />
      <InstagramWidget />
      <WhatsAppButton />
    </Layout>
  );
};

export default HomePage;
