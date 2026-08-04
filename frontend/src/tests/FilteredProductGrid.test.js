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

  test("Cada card linka pra página da coleção-mãe", () => {
    renderGrid(products);
    expect(screen.getByText("Modernice").closest("a")).toHaveAttribute(
      "href",
      "/collections/vestidos-petrova"
    );
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
