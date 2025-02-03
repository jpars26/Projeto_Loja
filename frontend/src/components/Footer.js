import React from "react";
import "../css/Footer.css";
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedin, FaPinterest, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2>VALE A PENA SENTIR-SE ESPECIAL!</h2>
        <div className="social-icons">
          <a href="https://www.instagram.com/iaranoivas/" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://www.facebook.com/iaranoivapa?locale=pt_BR" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" aria-label="YouTube"><FaYoutube /></a>
          <a href="https://www.linkedin.com/in/joaopaulo26/" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="#" aria-label="Pinterest"><FaPinterest /></a>
          <a href="https://www.wa.link/2j3p2z" aria-label="Whatsapp"><FaWhatsapp /></a>
        </div>
        <div className="languages">
          <span className="active">Portugues</span> | <span>Brasil</span>
        </div>
      </div>

      <div className="footer-links">
        <div className="footer-column">
          <h4>VESTIDOS</h4>
          <h4>COLEÇÃO</h4>
          <p>Trunk shows</p>
          <p>Solicite uma consulta</p>
        </div>
        <div className="footer-column">
          <h4>EMPRESA</h4>
          <p>Sobre nós</p>
          <p>Noticias</p>
          <p>Contato</p>
          <p>Torne-se parceiro</p>
          <p>Impressa</p>
        </div>
        <div className="footer-column">
          <h4>INSPIRAÇÃO</h4>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Iara Noivas - Vestidos de Casamento</p>
        <p>Made by <a href="https://github.com/jpars26">João Paulo</a></p>
      </div>
    </footer>
  );
};

export default Footer;
