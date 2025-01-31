// src/pages/CollectionsPage.js
import React from "react";
import CollectionGrid from "../components/sections/CollectionGrid";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CollectionsPage = () => {
  return (
    <div>
        <Header/>
        <CollectionGrid />
        <Footer/>
    </div>
  );
};

export default CollectionsPage;
