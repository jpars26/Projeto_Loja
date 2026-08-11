import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
  test("Sem filtro ativo, mostra direto todos os vestidos da categoria", () => {
    renderPage();
    expect(screen.getByText("Modernice")).toBeInTheDocument();
    expect(screen.getByText("Ascenção")).toBeInTheDocument();
    expect(screen.queryByText("Petrova - Coleção Alvor")).not.toBeInTheDocument();
  });

  test("Escolher uma cor troca pra grade filtrada com os produtos certos", () => {
    renderPage();
    fireEvent.click(screen.getByLabelText("Filtrar por cor verde"));

    expect(screen.getByText("Modernice")).toBeInTheDocument();
    expect(screen.queryByText("Ascenção")).not.toBeInTheDocument();
  });

  test("Categoria sem produto tagueado mostra 'Filtro em breve' e continua mostrando os vestidos", () => {
    renderPage("ternos");
    expect(screen.getByText("Filtro em breve")).toBeInTheDocument();
    expect(screen.getByText("Terno Slim Azul-Marinho")).toBeInTheDocument();
  });

  test("Limpar filtros volta a mostrar todos os vestidos da categoria", () => {
    renderPage();
    fireEvent.click(screen.getByLabelText("Filtrar por cor verde"));
    expect(screen.queryByText("Ascenção")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Limpar filtros"));
    expect(screen.getByText("Modernice")).toBeInTheDocument();
    expect(screen.getByText("Ascenção")).toBeInTheDocument();
  });
});

describe("CollectionsPage — vitrine de escolha (sem categoria)", () => {
  test("Sem categoria informada, mostra a vitrine de escolha em vez da grade padrão", () => {
    render(
      <BrowserRouter>
        <HelmetProvider>
          <MoodboardProvider>
            <CollectionsPage />
          </MoodboardProvider>
        </HelmetProvider>
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Encontre o look perfeito para o seu momento" })
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Filtrar por cor verde")).not.toBeInTheDocument();
    expect(screen.queryByText("Petrova - Coleção Alvor")).not.toBeInTheDocument();
  });

  test("Com categoria informada, continua mostrando os vestidos da categoria", () => {
    renderPage("noivas");
    expect(
      screen.queryByRole("heading", { level: 1, name: "Encontre o look perfeito para o seu momento" })
    ).not.toBeInTheDocument();
    expect(screen.getByText("Modernice")).toBeInTheDocument();
    expect(screen.getByText("Ascenção")).toBeInTheDocument();
  });

  test("SEO está configurado corretamente", async () => {
    render(
      <BrowserRouter>
        <HelmetProvider>
          <MoodboardProvider>
            <CollectionsPage />
          </MoodboardProvider>
        </HelmetProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(document.title).toBe(
        "Iara Noivas | Coleções — Vestidos de Noiva, Ternos e Vestidos de Festa"
      );
    });
  });
});
