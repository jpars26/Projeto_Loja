import React from "react";  
import { Link } from "react-router-dom";
import "../css/Header.css";
import { useState } from "react";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
       <img src="/assets/images/logo.png" alt="Iara Noivas Logo" />
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <nav className={`navbar ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Início</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>Sobre Nós</Link></li>
          <li><Link to="/services" onClick={() => setMenuOpen(false)}>Serviços</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contato</Link></li>
          <li><Link to="/shop" onClick={() => setMenuOpen(false)}>Loja</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
