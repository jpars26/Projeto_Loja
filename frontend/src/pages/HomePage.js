// src/pages/HomePage.js
import Hero from "../components/Hero";
import WhatsAppButton from '../components/WhatsAppButton';
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet-async";
import Sections from '../components/Sections';
import ContactForm from '../components/ContactForm';


const HomePage = () => {

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


      <WhatsAppButton />
    </Layout>
  );
};

export default HomePage;
