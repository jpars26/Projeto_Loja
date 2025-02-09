import React from "react";
import "../css/WhatsAppButton.css"; // Arquivo de estilos
import { FaWhatsapp } from "react-icons/fa"; // Ícone do WhatsApp

const WhatsAppButton = () => {
  const phoneNumber = '+5535998289198'; // Coloque o número de telefone da sua loja aqui


  return (
    <a
      href={`https://wa.me/${phoneNumber}`} // Substitua pelo seu número com DDD (ex: 5511999999999)
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contato pelo WhatsApp"
    >
      <FaWhatsapp className="whatsapp-icon"  data-testid="whatsapp-button-main"/>
    </a>
  );
};

export default WhatsAppButton;
