// Ponto único de configuração e montagem de mensagens de WhatsApp da loja
export const STORE_PHONE_NUMBER = "5535998127656";

export const buildWhatsAppUrl = (phoneNumber, message) =>
  `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

export const getDefaultMessage = () =>
  "Olá! Estou navegando no site da Iara Noivas e gostaria de mais informações sobre os vestidos.";

export const getFavoritesMessage = (moodboardItems) => {
  const dressNames = moodboardItems.map((item) => `- ${item.name}`).join("\n");
  return `Olá, gostaria de mais informações sobre esses vestidos que mais gostei:\n\n${dressNames}\n\nAguardo seu retorno!`;
};

export const getSingleDressMessage = (dressName, pageUrl) =>
  `Olá! Estou navegando no site da Iara Noivas e gostaria de mais informações sobre esse vestido: ${dressName}\n\n${pageUrl}`;

export const getScheduleMessage = () =>
  "Olá! Gostaria de agendar um atendimento para conhecer os vestidos.";
