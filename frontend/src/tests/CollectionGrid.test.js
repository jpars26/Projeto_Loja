import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CollectionGrid from "../components/CollectionGrid";

jest.mock("../data/catalog", () => [
  { id: "vestidos-petrova", name: "Petrova - Coleção Alvor", category: "noivas", image: "petrova.jpg" },
  { id: "vestidos-enlace", name: "Petrova - Enlace", category: "noivas", image: "enlace.jpg" },
  { id: "ternos-classico", name: "Ternos - Coleção Clássica", category: "ternos", image: "ternos.jpg" },
  { id: "festa-glamour", name: "Vestidos de Festa - Coleção Glamour", category: "festa", image: "festa.jpg" },
]);

const renderGrid = (category) =>
  render(
    <BrowserRouter>
      <CollectionGrid category={category} />
    </BrowserRouter>
  );

describe("CollectionGrid Component", () => {
  test("Renderiza o título e o banner", () => {
    renderGrid("noivas");
    expect(screen.getByText("Coleção Exclusiva")).toBeInTheDocument();
    expect(screen.getByAltText("Coleção Exclusiva")).toBeInTheDocument();
  });

  test("Filtra as coleções pela categoria informada", () => {
    renderGrid("noivas");
    expect(screen.getByText("Petrova - Coleção Alvor")).toBeInTheDocument();
    expect(screen.getByText("Petrova - Enlace")).toBeInTheDocument();
    expect(screen.queryByText("Ternos - Coleção Clássica")).not.toBeInTheDocument();
    expect(screen.queryByText("Vestidos de Festa - Coleção Glamório")).not.toBeInTheDocument();
  });

  test("Usa o texto de botão correto por categoria", () => {
    renderGrid("noivas");
    expect(screen.getAllByText("Ver Vestidos").length).toBe(2);

    renderGrid("ternos");
    expect(screen.getByText("Ver Ternos")).toBeInTheDocument();

    renderGrid("festa");
    expect(screen.getByText("Ver Looks de Festa")).toBeInTheDocument();
  });

  test("Cada item tem um link correto para /collections/:id", () => {
    renderGrid("noivas");
    expect(screen.getByRole("link", { name: /Petrova - Coleção Alvor/ })).toHaveAttribute(
      "href",
      "/collections/vestidos-petrova"
    );
    expect(screen.getByRole("link", { name: /Petrova - Enlace/ })).toHaveAttribute(
      "href",
      "/collections/vestidos-enlace"
    );
  });

  test("Não renderiza itens quando a categoria não tem coleções", () => {
    renderGrid("categoria-inexistente");
    expect(screen.getByText("Coleção Exclusiva")).toBeInTheDocument();
    expect(screen.queryAllByRole("link").length).toBe(0);
  });
});
