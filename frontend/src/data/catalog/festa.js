// Catálogo da categoria "festa". Ids de coleção usam sempre o prefixo
// "festa-" — nunca usar um id igual ao literal de categoria ("noivas",
// "ternos", "festa"), pois a rota /collections/:slug distingue categoria de
// id de coleção checando esse literal primeiro (ver App.js).
//
// Produtos com fotos placeholder até termos as fotos reais da coleção.
import img_1_assets_images_placeholders_foto_em_breve from "../../assets/images/placeholders/foto-em-breve.svg";

const placeholder = img_1_assets_images_placeholders_foto_em_breve;

const festa = [
  {
    id: "festa-glamour",
    name: "Vestidos de Festa - Coleção Glamour",
    image: placeholder,
    banner: placeholder,
    category: "festa",
    products: [
      {
        id: "festa-glamour-p1",
        name: "Vestido Longo Dourado",
        image: placeholder,
        model: "sereia",
        color: "dourado",
      },
      {
        id: "festa-glamour-p2",
        name: "Vestido Midi Esmeralda",
        image: placeholder,
        model: "princesa",
        color: "esmeralda",
      },
      {
        id: "festa-glamour-p3",
        name: "Vestido de Festa Bordado",
        image: placeholder,
        model: "sereia",
        color: "preto", // placeholder - substituir pela cor real
      },
    ],
  },
];

export default festa;
