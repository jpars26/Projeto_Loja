// src/pages/CollectionsPage.js
import React, { useEffect } from "react";
import CollectionGrid from "../components/CollectionGrid";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet";
import tourSteps from "../utils/TourSteps"; // Importando os steps
import { startTour } from "../utils/TourGuide"; // Importando TourGuide

const CollectionsPage = () => {
  useEffect(() => {
    startTour("collectionsPage", tourSteps.collectionsPage);
  }, []);

  return (
    <Layout>
        <Helmet>
          <title>Vestidos de Noiva - Coleções Exclusivas | Iara Noivas</title>
          <meta name="description" content="Descubra nossas coleções de vestidos de noiva elegantes e sofisticados para o seu grande dia." />
          <meta property="og:title" content="Coleções de Vestidos de Noiva - Iara Noivas" />
          <meta property="og:description" content="Conheça nossas coleções de vestidos para noivas sofisticadas." />
          <meta property="og:url" content="https://www.iaranoivas.com/collections" />
          <meta property="og:type" content="website" />
        </Helmet>
        <CollectionGrid />  
    </Layout>
  );
};

export default CollectionsPage;
