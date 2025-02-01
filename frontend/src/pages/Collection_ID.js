import React from "react";
import { useParams } from "react-router-dom";
import collections from "../data/collections"; 
import "../css/Collection_ID.css"; 
import Header from "../components/Header";
import Footer from "../components/Footer";

const Collection_ID = () => {
    const { id } = useParams(); 
    const collection = collections.find(col => col.id === id);

    if (!collection) {
        return <h2>Coleção não encontrada!</h2>;
    }

    return ( 
      <div className="collection-page">
        <Header/>
        <h1>{collection.name}</h1>
        <img src={collection.banner} alt={collection.name} className="collection-banner" />
        <p>Explore nossa coleção exclusiva de {collection.name}.</p>

        {/* Grid de Produtos */}
        <div className="product-grid">
          {collection.products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
          
        </div>

        <Footer/>
      </div>
    );
};

export default Collection_ID;
