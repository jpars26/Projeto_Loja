import React from "react";
import "../css/WhatsAppButton.css"; // Arquivo de estilos
import { FaWhatsapp } from "react-icons/fa"; // Ícone do WhatsApp

const WhatsAppButton = () => {
  const phoneNumber = '+5535998289198'; // Coloque o número de telefone da sua loja aqui

  // Mensagem padrão (com encode para funcionar na URL)
  const defaultMessage = encodeURIComponent("Olá! Estou navegando no site da Iara Noivas e gostaria de mais informações sobre os vestidos.");

  // Função para disparar o evento personalizado do Clarity
  const handleWhatsAppClick = () => {
    if (window.clarity) {
      window.clarity("set", "botao_whatsapp", "clicou");
    }
  };

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`} // Inclui a mensagem pré-definida
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contato pelo WhatsApp"
      onClick={handleWhatsAppClick} // Dispara o evento quando o link é clicado
    >
      <FaWhatsapp className="whatsapp-icon" data-testid="whatsapp-button-main" />
    </a>
  );
};

export default WhatsAppButton;
