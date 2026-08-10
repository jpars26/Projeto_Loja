import collectionsHub from "../data/collectionsHub";

// Deve ficar em sincronia com KNOWN_CATEGORIES em ../pages/CollectionSlugRouter.js.
// Não é possível importar o array diretamente pois ele não é exportado.
const KNOWN_CATEGORIES = ["noivas", "ternos", "festa"];

describe("CollectionSlugRouter — sincronia com collectionsHub", () => {
  test("todo slug da vitrine de coleções é uma categoria conhecida do roteador", () => {
    collectionsHub.forEach((item) => {
      expect(KNOWN_CATEGORIES).toContain(item.slug);
    });
  });
});
