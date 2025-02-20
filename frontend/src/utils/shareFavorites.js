export const shareFavorites = (moodboardItems) => {
    if (!moodboardItems || moodboardItems.length === 0) {
      alert("Você não tem vestidos favoritados!");
      return;
    }
  
    // Criar um link fictício para os favoritos (pode ser aprimorado para um sistema real)
    const favoriteIds = moodboardItems.map(item => item.id).join(",");
    const shareUrl = `${window.location.origin}/favoritos?ids=${favoriteIds}`;
  
    // Configuração da mensagem
    const shareData = {
      title: "Meus Vestidos Favoritos 💕",
      text: "Dá uma olhada nos vestidos que eu amei! 😍",
      url: shareUrl,
    };
  
    // Se o navegador suportar Web Share API, abre o menu nativo de compartilhamento
    if (navigator.share) {
      navigator.share(shareData)
        .catch(err => console.log("Erro ao compartilhar:", err));
    } else {
      // Se não for suportado, copia o link para a área de transferência
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert("Link copiado para a área de transferência!"))
        .catch(() => alert("Erro ao copiar o link."));
    }
  };
  