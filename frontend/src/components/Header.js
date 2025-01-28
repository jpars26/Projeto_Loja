import React from "react";  
import { Link } from "react-router-dom";
import "../css/Header.css";

const Header = () => {  
  return (
    <header id="home" className="header">
      <div className="logo">
        <img src="/assets/images/logo.png" alt="Iara Noivas Logo" />
        <h1>Iara Noivas</h1>
      </div>
      <nav className="navbar">
        <ul>
          <li><a href="#home">Início</a></li>
          <li><a href="#about">Sobre Nós</a></li>
          <li><a href="#services">Serviços</a></li>
          <li><a href="#contact">Contato</a></li>
          <li><Link to="/">Loja</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;