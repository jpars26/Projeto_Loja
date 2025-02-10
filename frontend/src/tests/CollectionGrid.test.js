import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CollectionGrid from "../components/sections/CollectionGrid";
import collections from "../data/collections"; 




//1️⃣ Teste: Renderização correta dos elementos principais
describe("CollectionGrid Component", () => {
  test("Renderiza corretamente os elementos principais", () => {
    render(
      <BrowserRouter>
        <CollectionGrid />
      </BrowserRouter>
    );

    // Verifica o título
    expect(screen.getByText("Coleção Exclusiva")).toBeInTheDocument();

    // Verifica se o banner foi renderizado
    expect(screen.getByAltText("Coleção Exclusiva")).toBeInTheDocument();

    // Verifica se todos os vestidos da coleção foram renderizados
    collections.forEach((dress) => {
      expect(screen.getByText(dress.name)).toBeInTheDocument();
    });
  });
});

//2️⃣ Teste: Links dos vestidos direcionam corretamente
describe("CollectionGrid Component", () => {
    test("Cada item da coleção tem um link correto", () => {
      render(
        <BrowserRouter>
          <CollectionGrid />
        </BrowserRouter>
      );
  
      collections.forEach((dress) => {
        const linkElement = screen.getByRole("link", { name: dress.name });
        expect(linkElement).toHaveAttribute("href", `/collections/${dress.id}`);
      });
    });
  });

  //3️⃣ Teste: As imagens dos vestidos são carregadas corretamente
  describe("CollectionGrid Component", () => {
    test("Imagens dos vestidos são carregadas corretamente", () => {
      render(
        <BrowserRouter>
          <CollectionGrid />
        </BrowserRouter>
      );
  
      collections.forEach((dress) => {
        const imgElement = screen.getByAltText(dress.name);
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute("src", dress.image);
      });
    });
  });
  
  jest.mock("../data/collections", () => [
    { id: "vestidos-petrova", name: "Petrova - Coleção Alvor", image: "https://grifepetrova.com/assets/cache_image/images/catalogo/55-magnificencia_410x575_95f.jpg" },
    { id: "vestidos-jardim-secreto-premium", name: "Petrova - Jardim Secreto Premium", image: "https://grifepetrova.com/assets/cache_image/images/catalogo/0T7A7695_2_376x563_70e.jpg" },
    { id: "vestidos-jardim-secreto", name: "Petrova - Jardim Secreto", image: "https://grifepetrova.com/assets/cache_image/images/Jardim%20Secreto/capa-home-site-jardim-secreto-thumb_376x563_433.png" }
  ]);

  //4️⃣ Teste: A coleção exibe a quantidade correta de itens
  describe("CollectionGrid Component", () => {
    test("A coleção exibe a quantidade correta de itens", () => {
      render(
        <BrowserRouter>
          <CollectionGrid />
        </BrowserRouter>
      );
  
      // Agora deve encontrar os links corretamente
      const collectionItems = screen.getAllByRole("img");
      expect(collectionItems.length).toBe(1); // Deve corresponder ao tamanho do array mockado
    });
  });

  //5️⃣ Teste: Componente não quebra se a coleção estiver vazia

  jest.mock("../data/collections", () => []);

  describe("CollectionGrid Component", () => {
    test("Lida corretamente com uma coleção vazia", () => {
      render(
        <BrowserRouter>
          <CollectionGrid />
        </BrowserRouter>
      );
  
      // Verifica se o título continua aparecendo
      expect(screen.getByText("Coleção Exclusiva")).toBeInTheDocument();
  
      // Verifica se nenhum item foi renderizado
      const collectionItems = screen.queryAllByRole("link");
      expect(collectionItems.length).toBe(0);
    });
  });