import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MoodboardProvider } from "../context/MoodboardContext";
import FilteredProductGrid from "../components/FilteredProductGrid";

const products = [
  { id: "vestidos-petrova-p1", name: "Modernice", image: "p1.jpg", collectionId: "vestidos-petrova" },
  { id: "vestidos-enlace-p1", name: "Vênus", image: "p2.jpg", collectionId: "vestidos-enlace" },
];

const renderGrid = (items, onClearFilters = () => {}) =>
  render(
    <BrowserRouter>
      <MoodboardProvider>
        <FilteredProductGrid products={items} onClearFilters={onClearFilters} />
      </MoodboardProvider>
    </BrowserRouter>
  );

describe("FilteredProductGrid", () => {
  test("Renderiza a contagem e os produtos", () => {
    renderGrid(products);
    expect(screen.getByText("2 vestidos encontrados")).toBeInTheDocument();
    expect(screen.getByText("Modernice")).toBeInTheDocument();
    expect(screen.getByText("Vênus")).toBeInTheDocument();
  });

  test("O card em si não navega, só o link 'Ver coleção completa' leva pra coleção-mãe", () => {
    renderGrid(products);
    expect(screen.getByText("Modernice").closest("a")).toBeNull();

    const links = screen.getAllByText("Ver coleção completa");
    expect(links[0]).toHaveAttribute("href", "/collections/vestidos-petrova");
    expect(links[1]).toHaveAttribute("href", "/collections/vestidos-enlace");
  });

  test("Sem collectionId (uso dentro da própria página da coleção), não mostra 'Ver coleção completa'", () => {
    renderGrid([{ id: "vestidos-petrova-p1", name: "Modernice", image: "p1.jpg" }]);
    expect(screen.queryByText("Ver coleção completa")).not.toBeInTheDocument();
  });

  test("Mostra estado vazio e aciona onClearFilters", () => {
    const onClearFilters = jest.fn();
    renderGrid([], onClearFilters);
    expect(screen.getByText("Nenhum vestido encontrado com esse filtro.")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Limpar filtros"));
    expect(onClearFilters).toHaveBeenCalled();
  });

  test("Usa singular quando há só 1 resultado", () => {
    renderGrid([products[0]]);
    expect(screen.getByText("1 vestido encontrado")).toBeInTheDocument();
  });
});
