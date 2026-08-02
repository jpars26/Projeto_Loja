import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMoodboard } from "../context/MoodboardContext";
import { FaRegHeart } from "react-icons/fa"; // Ícone do coração
import { List, X } from "phosphor-react"; // Ícones de menu refinados
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import logo from "../assets/images/logoGrande.webp";

const NAV_LINKS = [
  { to: "/home", label: "Início" },
  { to: "/collections", label: "Coleção" },
  { to: "/about", label: "Sobre" },
  { to: "/contact", label: "Contato" },
];

const Header = () => {
  const { moodboardItems } = useMoodboard();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleFavoriteClick = () => {
    if (window.clarity) {
      window.clarity("set", "botao_favorito", "clicou");
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-hairline bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/home" className="shrink-0">
          <LazyLoadImage src={logo} alt="Logo Iara Noiva" className="h-10 w-auto sm:h-12" />
        </Link>

        <nav
          className={`${menuOpen ? "open flex" : "hidden"} absolute left-0 top-full w-full flex-col border-t border-hairline bg-surface px-4 py-2 md:static md:flex md:w-auto md:flex-row md:border-0 md:bg-transparent md:p-0`}
        >
          <ul className="flex flex-col md:flex-row md:items-center md:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={closeMenu}
                  className="block py-2 font-body text-sm uppercase tracking-wide text-ink transition-colors hover:text-accent md:py-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <button
            className="flex h-11 w-11 items-center justify-center text-ink md:hidden"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
          </button>

          <Link to="/moodboard" onClick={handleFavoriteClick} className="relative shrink-0">
            <FaRegHeart
              className="h-5 w-5 text-ink transition-colors hover:text-accent"
              aria-label="Acessar Favoritos"
            />
            {moodboardItems.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-surface bg-accent text-[10px] font-bold text-surface">
                {moodboardItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
