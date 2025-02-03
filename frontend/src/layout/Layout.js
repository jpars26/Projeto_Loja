import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1, paddingTop: "80px" }}>{children}</main> {/* Aqui corrigimos */}
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Layout;
