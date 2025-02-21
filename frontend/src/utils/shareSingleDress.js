// src/utils/shareSingleDress.js
export const shareSingleDress = (event) => {
    // Pegamos o nome do vestido do atributo 'data-name' do botão
    const dressName = event.currentTarget.getAttribute("data-name");
  
    if (!dressName) {
      alert("Erro ao compartilhar. Não foi possível identificar o vestido.");
      return;
    }
  
    // Criamos a mensagem personalizada
    const message = `Amiga, adorei esse modelo! ❤️ Dá uma olhada: ${dressName}\n\n${window.location.href}`;
  
    // Criamos o link do WhatsApp
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  
    // Abrimos o WhatsApp
    window.open(whatsappUrl, "_blank");
  };
  