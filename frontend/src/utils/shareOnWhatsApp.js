export const shareOnWhatsApp = (moodboardItems) => {
    if (!moodboardItems || moodboardItems.length === 0) {
      alert("Você não tem vestidos favoritados!");
      return;
    }
  
    // Criar a lista dos vestidos favoritos
    const dressNames = moodboardItems.map(item => `- ${item.name}`).join("\n");
  
    // Número do WhatsApp da loja
    const storePhoneNumber = "5535998289198"; // DDD + número
  
    // Mensagem personalizada
    const message = `Olá, gostaria de mais informações sobre esses vestidos que mais gostei:\n\n${dressNames}\n\nAguardo seu retorno!`;
  
    // Criar o link do WhatsApp
    const whatsappUrl = `https://wa.me/${storePhoneNumber}?text=${encodeURIComponent(message)}`;
  
    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank");
  };
  