// src/pages/MoodboardPage.js
import React from "react";
import Moodboard from "../components/sections/Moodboard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MoodboardPage = () => {
  return (
    <div>
        <Header/>
        <Moodboard />
        <Footer/>
        
    </div>
  );
};

export default MoodboardPage;
