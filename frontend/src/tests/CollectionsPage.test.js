import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MoodboardProvider } from "../context/MoodboardContext";
import CollectionsPage from "../pages/CollectionsPage";

jest.mock("../data/catalog", () => [
  {
    id: "vestidos-petrova",
    name: "Petrova - Coleção Alvor",
    image: "petrova.jpg",
    category: "noivas",
    products: [
      { id: "vestidos-petrova-p1", name: "Modernice", image: "p1.jpg", color: "verde", model: "sereia" },
      { id: "vestidos-petrova-p2", name: "Ascenção", image: "p2.jpg", color: "azul", model: "princesa" },
    ],
  },
  {
    id: "ternos-classico",
    name: "Ternos - Coleção Clássica",
    image: "ternos.jpg",
    category: "ternos",
    products: [{ id: "ternos-classico-p1", name: "Terno Slim Azul-Marinho", image: "p3.jpg" }],
  },
]);

const renderPage = (category = "noivas") =>
  render(
    <BrowserRouter>
      <HelmetProvider>
        <MoodboardProvider>
          <CollectionsPage category={category} />
        </MoodboardProvider>
      </HelmetProvider>
    </BrowserRouter>
  );

describe("CollectionsPage", () => {
  test("Sem filtro ativo, mostra a vitrine de coleções", () => {
    renderPage();
    expect(screen.getByText("Petrova - Coleção Alvor")).toBeInTheDocument();
    expect(screen.queryByText("Modernice")).not.toBeInTheDocument();
  });

  test("Escolher uma cor troca pra grade filtrada com os produtos certos", () => {
    renderPage();
    fireEvent.click(screen.getByLabelText("Filtrar por cor verde"));

    expect(screen.queryByText("Petrova - Coleção Alvor")).not.toBeInTheDocument();
    expect(screen.getByText("Modernice")).toBeInTheDocument();
    expect(screen.queryByText("Ascenção")).not.toBeInTheDocument();
  });

  test("Categoria sem produto tagueado mostra 'Filtro em breve' e continua na vitrine", () => {
    renderPage("ternos");
    expect(screen.getByText("Filtro em breve")).toBeInTheDocument();
    expect(screen.getByText("Ternos - Coleção Clássica")).toBeInTheDocument();
  });

  test("Limpar filtros volta pra vitrine de coleções", () => {
    renderPage();
    fireEvent.click(screen.getByLabelText("Filtrar por cor verde"));
    expect(screen.getByText("Modernice")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Limpar filtros"));
    expect(screen.getByText("Petrova - Coleção Alvor")).toBeInTheDocument();
  });
});
