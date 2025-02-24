// src/utils/TourSteps.js
import { nextStep, completeTour } from "../utils/TourGuide"; // Importando TourGuide

const tourSteps = {
    home: [
      {
          id: "hero-section",
          text: "💖 Bem-vindo à Iara Noivas! Aqui você encontrará o vestido perfeito para o seu grande dia! 👰💖",
          attachTo: { element: ".hero-container", on: "top" },
          buttons: [{ text: "Próximo", action: nextStep }]
        },
        {
          id: "favorites-button",
          text: "💖 Aqui estão seus vestidos favoritos! Você pode acessá-los a qualquer momento!",
          attachTo: { element: ".moodboard-icon", on: "bottom" },
          buttons: [{ text: "Próximo", action: nextStep }]
        },
        {
          id: "collections-section",
          text: "👗 Explore nossa coleção e encontre o vestido dos seus sonhos! ✨",
          attachTo: { element: ".dual-section", on: "top" },
          buttons: [{ text: "Próximo", action: nextStep }]
        },
        {
          id:"cta-section",
          text: "📅 Quer ver os vestidos de perto? Clique aqui para agendar uma visita com nossa equipe!",
          attachTo: { element: ".agd-button", on: "top" },
          buttons: [{ text: "Próximo", action: nextStep }]
        },
        {
          id: "contact-form",
          text: "📩 Se precisar de mais informações, preencha o formulário de contato e falaremos com você rapidamente!",
          attachTo: { element: ".contact-form", on: "top" },
          buttons: [{ text: "Próximo", action: nextStep }]
        },
        {
          id: "whatsapp-button",
          text: "💬 Fale diretamente com nossa equipe pelo WhatsApp e tire todas as suas dúvidas!",
          attachTo: { element: ".whatsapp-button", on: "left" },
          buttons: [{ text: "Finalizar", action: completeTour }]
        }
    ],
  
    collectionsPage: [
       {
          id: "collection-grid",
          text: "🌟 Aqui estão nossas coleções exclusivas de vestidos de noiva! Escolha o seu favorito!",
          attachTo: { element: ".collection-grid", on: "top" },
          buttons: [{ text: "Próximo", action: nextStep }] // Agora avança para o próximo passo
        },
        {
          id: "collection-grid",
          text: "🛍️ Para ver os vestidos de cada coleção, clique aqui! 🏷️",
          attachTo: { element: ".btnCollection", on: "bottom" },
          buttons: [{ text: "Finalizar", action: completeTour }]
        }
    ],

    collection:[
        {
            id: "collection-title",
            text: "❤️ Curta seus vestidos favoritos! Os vestidos que você curtir ficarão salvos na página de Favoritos. 💍",
            attachTo: { element: ".collection-banner", on: "bottom" },
            buttons: [{ text: "Próximo", action: nextStep }]
          },
          {
            id: "favorites-button",
            text: "💖 Aqui estão seus vestidos favoritos! Você pode acessá-los a qualquer momento!",
            attachTo: { element: ".moodboard-icon", on: "bottom" },
            buttons: [{ text: "Próximo", action: nextStep }]
          },
          {
            id: "like-button",
            text: "👍 Gostou deste vestido? Clique aqui para salvar nos favoritos!",
            attachTo: { element: ".heart-btn", on: "right" },
            buttons: [{ text: "Próximo", action: nextStep }]
          },
          {
            id: "share-buttons",
            text: "📲 Compartilhe este vestido no WhatsApp ou nas redes sociais e peça a opinião das suas amigas! 👯‍♀️",
            attachTo: { element: ".share-buttons-container", on: "top" },
            buttons: [{ text: "Finalizar", action: completeTour }]
          }
    ],
  
    moodboard: [
      {
          id: "favorites-button",
          text: "💖 Aqui estão seus vestidos favoritos! Você pode acessá-los a qualquer momento!",
          attachTo: { element: ".moodboard-icon", on: "bottom" },
          buttons: [{ text: "Próximo", action: nextStep }]
        },
        {
          id: "share-buttons",
          text: "📩 Compartilhe seus vestidos favoritos com a gente pelo WhatsApp e receba mais informações! 📝",
          attachTo: { element: ".share-buttons-container", on: "top" },
          buttons: [{ text: "Entendi", action: completeTour }]
        }
    ],

    aboutUs: [
        {
          id: "gallery-section",
          text: "📸 Você também pode fazer parte da nossa galeria de noivas felizes! Envie sua foto e compartilhe sua história com a Iara Noivas. ❤️",
          attachTo: { element: ".customer-gallery", on: "top" },
          buttons: [{ text: "Próximo", action: nextStep }]
        },
        {
          id: "cta-button",
          text: "📅 Agende um atendimento exclusivo e encontre o vestido perfeito para o seu grande dia!",
          attachTo: { element: ".cta-button", on: "top" },
          buttons: [{ text: "Finalizar", action: completeTour }]
        }
      ]
      
  };
  
  export default tourSteps;
  