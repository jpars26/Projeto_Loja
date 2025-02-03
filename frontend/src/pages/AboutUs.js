import React from 'react';
import CustomerGallery from '../components/sections/CustomerGallery'; // Importe o CustomerGallery aqui
import Layout from '../layout/Layout';
import { Helmet } from "react-helmet";

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

      <section className="about-us">
        <h1>Sobre a Iara Noivas</h1>
        <p>
          A Iara Noivas nasceu da paixão por vestidos de casamento elegantes e sofisticados.
          Desde nossa fundação, ajudamos noivas a realizarem seus sonhos com modelos exclusivos e atemporais.
        </p>
        <CustomerGallery />
      </section>
    </Layout>
    
     
  );
}

export default AboutUs;