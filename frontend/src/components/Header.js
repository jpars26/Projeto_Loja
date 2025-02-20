import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import { useMoodboard } from "../context/MoodboardContext";
import { FaRegHeart } from "react-icons/fa"; // Ícone do coração
import { List, X } from "phosphor-react"; // Ícones de menu refinados
import { LazyLoadImage } from "react-lazy-load-image-component";

const logo = require('../assets/images/logoGrande.webp');

const Header = () => {
  const { moodboardItems } = useMoodboard();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/home">
          <LazyLoadImage src={logo} alt="Logo Iara Noiva" />
        </Link>
      </div>

      {/* Navbar Responsiva */}
      <nav className={`navbar ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/home" onClick={() => setMenuOpen(false)}>Início</Link></li>
          <li><Link to="/collections" onClick={() => setMenuOpen(false)}>Coleção</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>Sobre</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contato</Link></li>
        </ul>
      </nav>

    

      <div className="header-icons">
          <button className="menu-toggle"  aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} weight="light" /> : <List size={28} weight="light" />}
          </button>
          <div className="moodboard-icon">
            <Link to="/moodboard">
              <FaRegHeart className="heart-icon" aria-label="Acessar Favoritos" />
              {moodboardItems.length > 0 && (
                <span className="notification-badge">{moodboardItems.length}</span>
              )}
            </Link>
      </div>
    </div>

    </header>
  );
};

export default Header;
