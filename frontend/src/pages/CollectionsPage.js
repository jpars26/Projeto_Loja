// src/pages/CollectionsPage.js

import CollectionGrid from "../components/CollectionGrid";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet";

const CollectionsPage = () => {
 

  return (
    <Layout>
        <Helmet>
          <title>Iara Noivas | Vestidos de Noiva - Coleções Exclusivas </title>
          <meta name="description" content="Descubra nossas coleções de vestidos de noiva elegantes e sofisticados para o seu grande dia." />
          <meta property="og:title" content="Iara Noivas- Coleções de Vestidos de Noiva" />
          <meta property="og:description" content="Conheça nossas coleções de vestidos para noivas sofisticadas." />
          <meta property="og:url" content="https://www.iaranoivas.com/collections" />
          <meta property="og:type" content="website" />
        </Helmet>
        <CollectionGrid />  
    </Layout>
  );
};

export default CollectionsPage;
