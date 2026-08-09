import { FaWhatsapp } from "react-icons/fa"; // Ícone do WhatsApp
import { useMoodboard } from "../context/MoodboardContext";
import { STORE_PHONE_NUMBER, buildWhatsAppUrl, getDefaultMessage, getFavoritesMessage } from "../utils/whatsapp";

const WhatsAppButton = () => {
  const { moodboardItems } = useMoodboard();

  // Se já tem favoritos, manda a lista deles; senão, a mensagem padrão
  const message = moodboardItems.length > 0 ? getFavoritesMessage(moodboardItems) : getDefaultMessage();
  const whatsappUrl = buildWhatsAppUrl(STORE_PHONE_NUMBER, message);

  // Função para disparar o evento personalizado do Clarity
  const handleWhatsAppClick = () => {
    if (window.clarity) {
      window.clarity("set", "botao_whatsapp", "clicou");
    }
  };

  return (
    <a
      href={whatsappUrl}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-bone shadow-lg transition-transform hover:scale-110"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contato pelo WhatsApp"
      onClick={handleWhatsAppClick} // Dispara o evento quando o link é clicado
    >
      <FaWhatsapp className="text-2xl" data-testid="whatsapp-button-main" />
    </a>
  );
};

export default WhatsAppButton;
