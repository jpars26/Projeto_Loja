// src/components/WhatsAppButton.js
import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = '+55XXXXXXXXXXX'; // Coloque o número de telefone da sua loja aqui

  return (
    <a 
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <button className="whatsapp-btn">Fale Conosco no WhatsApp</button>
    </a>
  );
};

export default WhatsAppButton;
