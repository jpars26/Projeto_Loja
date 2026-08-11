import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MoodboardProvider } from "../context/MoodboardContext";
import FilteredProductGrid from "../components/FilteredProductGrid";

const products = [
  { id: "vestidos-petrova-p1", name: "Modernice", image: "p1.jpg" },
  { id: "vestidos-enlace-p1", name: "Vênus", image: "p2.jpg" },
];

const renderGrid = (items, onClearFilters = () => {}, hasActiveFilter) =>
  render(
    <BrowserRouter>
      <MoodboardProvider>
        <FilteredProductGrid
          products={items}
          onClearFilters={onClearFilters}
          {...(hasActiveFilter === undefined ? {} : { hasActiveFilter })}
        />
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

  test("Sem filtro ativo (categoria vazia), mostra mensagem de coleção vazia sem botão de limpar filtros", () => {
    renderGrid([], () => {}, false);
    expect(screen.getByText("Nenhum vestido encontrado nesta coleção.")).toBeInTheDocument();
    expect(screen.queryByText("Limpar filtros")).not.toBeInTheDocument();
  });
});
