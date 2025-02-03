// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import { useMoodboard } from "../context/MoodboardContext";
import { FaRegHeart, FaBars, FaTimes } from "react-icons/fa"; // Ícones
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedin, FaPinterest, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";



const Header = () => {
  const { moodboardItems } = useMoodboard();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <h1>Iara Noivas</h1>
      </div>

      {/* Botão do menu hamburguer */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />} {/* Ícone muda */}
      </button>

      {/* Navbar Responsiva */}
      <nav className={`navbar ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/home" onClick={() => setMenuOpen(false)}>Início</Link></li>
          <li><Link to="/collections" onClick={() => setMenuOpen(false)}>Coleção</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>Sobre</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contato</Link></li>
        </ul>
        
      </nav>
    
      {/* Ícone do Moodboard */}
      <div className="moodboard-icon">
        <Link to="/moodboard">
          <FaRegHeart className="heart-icon" />
          {moodboardItems.length > 0 && (
            <span className="notification-badge">{moodboardItems.length}</span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;