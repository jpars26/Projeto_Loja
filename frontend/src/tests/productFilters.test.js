import {
  computeAvailableFilterOptions,
  filterProductsByAttributes,
  parseFilterParam,
} from "../utils/productFilters";

const products = [
  { id: "p1", name: "Modernice", color: "verde", model: "sereia" },
  { id: "p2", name: "Ascenção", color: "azul", model: "princesa" },
  { id: "p3", name: "Vênus", color: "verde", model: "princesa" },
  { id: "p4", name: "Sem dados" },
];

describe("computeAvailableFilterOptions", () => {
  test("retorna cores e modelos únicos e ordenados, ignorando produto sem o campo", () => {
    expect(computeAvailableFilterOptions(products)).toEqual({
      colors: ["azul", "verde"],
      models: ["princesa", "sereia"],
    });
  });

  test("retorna listas vazias quando nenhum produto tem os campos", () => {
    expect(computeAvailableFilterOptions([{ id: "p1", name: "Sem dados" }])).toEqual({
      colors: [],
      models: [],
    });
  });
});

describe("filterProductsByAttributes", () => {
  test("sem seleção nenhuma, retorna todos os produtos", () => {
    expect(filterProductsByAttributes(products, {})).toEqual(products);
  });

  test("filtra por cor (OU dentro da dimensão)", () => {
    const result = filterProductsByAttributes(products, { colors: ["azul"] });
    expect(result.map((product) => product.id)).toEqual(["p2"]);
  });

  test("cor e modelo juntos usam E entre dimensões", () => {
    const result = filterProductsByAttributes(products, { colors: ["verde"], models: ["princesa"] });
    expect(result.map((product) => product.id)).toEqual(["p3"]);
  });

  test("produto sem o campo nunca aparece quando aquela dimensão está filtrada", () => {
    const result = filterProductsByAttributes(products, { colors: ["verde", "azul"] });
    expect(result.some((product) => product.id === "p4")).toBe(false);
  });
});

describe("parseFilterParam", () => {
  test("separa por vírgula", () => {
    expect(parseFilterParam("verde,azul")).toEqual(["verde", "azul"]);
  });

  test("valor único vira array de 1", () => {
    expect(parseFilterParam("verde")).toEqual(["verde"]);
  });

  test("null ou string vazia viram array vazio", () => {
    expect(parseFilterParam(null)).toEqual([]);
    expect(parseFilterParam("")).toEqual([]);
  });
});
