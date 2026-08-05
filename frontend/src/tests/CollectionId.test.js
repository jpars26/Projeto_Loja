import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MoodboardProvider } from "../context/MoodboardContext";
import CollectionId from "../pages/CollectionId";

jest.mock("react-router-dom", () => {
  const actualModule = jest.requireActual("react-router-dom");
  return {
    ...actualModule,
    useParams: () => ({ slug: "festa-glamour" }),
  };
});

jest.mock("../data/catalog", () => [
  {
    id: "festa-glamour",
    name: "Vestidos de Festa - Coleção Glamour",
    banner: "banner-festa-glamour.jpg",
    category: "festa",
    products: [
      { id: "festa-glamour-p1", name: "Vestido Longo Dourado", image: "p1.jpg", color: "dourado", model: "sereia" },
      { id: "festa-glamour-p2", name: "Vestido Midi Esmeralda", image: "p2.jpg", color: "esmeralda", model: "princesa" },
    ],
  },
]);

const renderPage = () =>
  render(
    <BrowserRouter>
      <HelmetProvider>
        <MoodboardProvider>
          <CollectionId />
        </MoodboardProvider>
      </HelmetProvider>
    </BrowserRouter>
  );

describe("CollectionId Page", () => {
  test("Renderiza o banner da coleção encontrada", () => {
    renderPage();
    expect(screen.getByAltText("Vestidos de Festa - Coleção Glamour")).toBeInTheDocument();
  });

  test("Renderiza os produtos da coleção", () => {
    renderPage();
    expect(screen.getByText("Vestido Longo Dourado")).toBeInTheDocument();
  });

  test("Filtrar por cor mostra só o produto que bate, sem link 'Ver coleção completa'", () => {
    renderPage();
    fireEvent.click(screen.getByLabelText("Filtrar por cor dourado"));

    expect(screen.getByText("Vestido Longo Dourado")).toBeInTheDocument();
    expect(screen.queryByText("Vestido Midi Esmeralda")).not.toBeInTheDocument();
    expect(screen.queryByText("Ver coleção completa")).not.toBeInTheDocument();
  });

  test("Limpar filtros volta a mostrar todos os produtos da coleção", () => {
    renderPage();
    fireEvent.click(screen.getByLabelText("Filtrar por cor dourado"));
    fireEvent.click(screen.getByText("Limpar filtros"));

    expect(screen.getByText("Vestido Longo Dourado")).toBeInTheDocument();
    expect(screen.getByText("Vestido Midi Esmeralda")).toBeInTheDocument();
  });
});
