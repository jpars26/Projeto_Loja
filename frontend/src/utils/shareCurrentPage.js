export const shareCurrentPage = () => {
    const shareData = {
      title: document.title,
      text: "Confira essa página!",
      url: window.location.href, // URL atual da página
    };
  
    if (navigator.share) {
      navigator.share(shareData).catch(err => console.log("Erro ao compartilhar:", err));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert("Link copiado!"))
        .catch(() => alert("Erro ao copiar o link."));
    }
  };