import React from "react";
import "../css/Footer.css";
import { FaInstagram, FaFacebookF, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer_h2">VENHA SE SENTIR-SE ESPECIAL!</h2>
        <div className="social-icons">
          <a href="https://www.instagram.com/iaranoivas/" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://www.facebook.com/iaranoivapa?locale=pt_BR" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://www.linkedin.com/in/joaopaulo26/" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://wa.me/+5535998127656" aria-label="Whatsapp"><FaWhatsapp /></a>
        </div>
        <div className="languages">
          <span className="active">Portugues</span> | <span>Brasil</span>
        </div>
      </div>

      <div className="footer-links">
        <div className="footer-column">
          <h4>VESTIDOS</h4>
          <Link to="https://wa.me/+5535998127656" target="_blank" rel="noopener noreferrer" className="collection-footer">
          <p>Solicite uma consulta</p>
          </Link>
        </div>
        <div className="footer-column">
          <h4>EMPRESA</h4>
          <Link to="/about" className="collection-footer">
          <p>Sobre nós</p>
          </Link>
          <Link to={'/contact'} className="collection-footer">
          <p>Contato</p>
          </Link>
        </div>
      </div>
      <div className="footer-partners">
    <h4>Parceiros</h4>
    <div className="partners-logos">
        <a href="https://producao-loja.web.app/home" target="_blank" rel="noopener noreferrer">
            <img src="https://grifepetrova.com/images/IMG_2348.JPG" alt="Petrova" className="partner-logo petrova"/>
        </a>
        <a href="https://producao-loja.web.app/home" target="_blank" rel="noopener noreferrer">
            <img src="https://novanoiva.com.br/wp-content/uploads/2022/09/logo_nova_noiva_home.svg" alt="Nova Noiva" className="partner-logo"/>
        </a>
        <a href="https://producao-loja.web.app/home" target="_blank" rel="noopener noreferrer">
            <img src="https://tuttisposa.com.br/wp-content/uploads/2020/11/logo-tutti-sposa-redimensionado.png" alt="Tutti Sposa" className="partner-logo"/>
        </a>
      </div>
    </div>

      <div className="footer-bottom">
        <p>© 2025 Iara Noivas - Vestidos de Casamento</p>
        <p>Made by <a href="https://github.com/jpars26">Jpars26</a></p>
      </div>
    </footer>
  );
};

export default Footer;
