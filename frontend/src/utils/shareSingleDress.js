// src/utils/shareSingleDress.js
import { STORE_PHONE_NUMBER, buildWhatsAppUrl, getSingleDressMessage } from "./whatsapp";

export const shareSingleDress = (dressName) => {
  const message = getSingleDressMessage(dressName, window.location.href);
  const whatsappUrl = buildWhatsAppUrl(STORE_PHONE_NUMBER, message);

  window.open(whatsappUrl, "_blank");
};
