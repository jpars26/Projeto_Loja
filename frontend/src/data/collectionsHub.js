// src/data/collectionsHub.js
//
// Conteúdo dos 3 cards da vitrine de coleções (/collections sem categoria).
// Trocar `image`/`imageAlt` aqui quando houver fotos reais — hoje "ternos"
// usa o mesmo placeholder do catálogo (ver data/catalog/ternos.js), pois
// ainda não existem fotos reais de ternos.
import imgNoivas from "../assets/images/ImagensVestidos/Alvor/imagem_5.webp";
import imgTernos from "../assets/images/placeholders/foto-em-breve.svg";
import imgFesta from "../assets/images/MadrinhaOtimizada/azul-marinho_princesa_longo_v.webp";

const collectionsHub = [
  {
    slug: "noivas",
    title: "Vestidos de Noiva",
    description: "Para o seu grande dia.",
    ctaLabel: "Conheça a coleção →",
    image: imgNoivas,
    imageAlt: "Vestido de noiva da coleção Alvor, Iara Noivas",
  },
  {
    slug: "ternos",
    title: "Ternos",
    description: "Elegância para momentos especiais.",
    ctaLabel: "Conheça a coleção →",
    image: imgTernos,
    imageAlt: "Ternos Iara Noivas — fotos em breve",
  },
  {
    slug: "festa",
    title: "Vestidos de Festa",
    description: "Para celebrar ocasiões inesquecíveis.",
    ctaLabel: "Conheça a coleção →",
    image: imgFesta,
    imageAlt: "Vestido de festa azul-marinho estilo princesa, Iara Noivas",
  },
];

export default collectionsHub;
