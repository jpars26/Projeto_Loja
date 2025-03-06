import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import "../css/Layout.css"; // Importando o CSS
import BackToTopAndBackButton from "../components/BackToTopAndBackButton";


const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main style={{ flex: 1, paddingTop: "80px" }}>{children}</main> {/* Aqui corrigimos */}
      <WhatsAppButton />
      <BackToTopAndBackButton />
      <Footer />
    </div>
  );
};

export default Layout;
