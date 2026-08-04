import flattenCategoryProducts from "../utils/flattenCategoryProducts";

const catalog = [
  {
    id: "vestidos-petrova",
    name: "Petrova - Coleção Alvor",
    category: "noivas",
    products: [
      { id: "vestidos-petrova-p1", name: "Modernice", image: "p1.jpg", model: "sereia" },
      { id: "vestidos-petrova-p2", name: "Ascenção", image: "p2.jpg", model: "princesa" },
    ],
  },
  {
    id: "vestidos-enlace",
    name: "Petrova - Enlace",
    category: "noivas",
    products: [{ id: "vestidos-enlace-p1", name: "Vênus", image: "p3.jpg" }],
  },
  {
    id: "ternos-classico",
    name: "Ternos - Coleção Clássica",
    category: "ternos",
    products: [{ id: "ternos-classico-p1", name: "Terno Slim Azul-Marinho", image: "p4.jpg" }],
  },
];

describe("flattenCategoryProducts", () => {
  test("retorna só os produtos das coleções da categoria informada", () => {
    const result = flattenCategoryProducts(catalog, "noivas");
    expect(result).toHaveLength(3);
    expect(result.map((product) => product.id)).toEqual([
      "vestidos-petrova-p1",
      "vestidos-petrova-p2",
      "vestidos-enlace-p1",
    ]);
  });

  test("mantém os campos originais do produto", () => {
    const result = flattenCategoryProducts(catalog, "noivas");
    expect(result[0]).toMatchObject({ name: "Modernice", image: "p1.jpg", model: "sereia" });
  });

  test("anexa collectionId e collectionName da coleção-mãe", () => {
    const result = flattenCategoryProducts(catalog, "noivas");
    expect(result[0]).toMatchObject({
      collectionId: "vestidos-petrova",
      collectionName: "Petrova - Coleção Alvor",
    });
  });

  test("retorna array vazio quando a categoria não tem coleções", () => {
    expect(flattenCategoryProducts(catalog, "festa")).toEqual([]);
  });
});
