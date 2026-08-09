import { STORE_PHONE_NUMBER, buildWhatsAppUrl, getFavoritesMessage } from "./whatsapp";

export const shareOnWhatsApp = (moodboardItems) => {
  if (!moodboardItems || moodboardItems.length === 0) {
    alert("Você não tem vestidos favoritados!");
    return;
  }

  const message = getFavoritesMessage(moodboardItems);
  const whatsappUrl = buildWhatsAppUrl(STORE_PHONE_NUMBER, message);

  window.open(whatsappUrl, "_blank");
};
