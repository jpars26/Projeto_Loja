import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AboutUs from "../pages/AboutUs";
import { MoodboardProvider } from "../context/MoodboardContext"; 
import { waitFor } from "@testing-library/react";

describe("AboutUs Page", () => {
  const renderWithProviders = (component) =>
    render(
      <HelmetProvider>
        <MoodboardProvider>
          <BrowserRouter>{component}</BrowserRouter>
        </MoodboardProvider>
      </HelmetProvider>
    );

  test("Renderiza corretamente os elementos principais", () => {
    renderWithProviders(<AboutUs />);

    expect(screen.getByRole("heading", { name: /realizamos sonhos, um vestido por vez/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /nossa história/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /por que escolher a iara noivas/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /noivas felizes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /agendar atendimento/i })).toBeInTheDocument();
  });

  test("SEO está configurado corretamente", async () => {
    renderWithProviders(<AboutUs />);
  
    await waitFor(() => {
      expect(document.title).toBe("Sobre Nós - Iara Noivas");
    });
  
    await waitFor(() => {
      const metaDescription = document
        .querySelector('meta[name="description"]')
        .getAttribute("content");
      expect(metaDescription).toBe("Conheça a história da Iara Noivas e nossa paixão por criar vestidos de noiva inesquecíveis.");
    });
  });
  
  test("Linha do tempo da história é exibida corretamente", () => {
    renderWithProviders(<AboutUs />);

    const timelineItems = [
      "2003",
      "Fundação da Iara Noivas, inspirada pelo amor à moda nupcial.",
      "2010",
      "Começamos a criar vestidos sob medida, exclusivos para cada noiva.",
      "2020",
      "Nossas peças se tornaram referência em casamentos de luxo.",
      "2024",
      "Expandimos para novas coleções exclusivas."
    ];

    timelineItems.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  test("Os diferenciais são exibidos corretamente", () => {
    renderWithProviders(<AboutUs />);

    const differentials = [
      "Feitos Sob Medida",
      "Cada vestido é desenhado para refletir sua personalidade e estilo.",
      "22 Anos de Tradição",
      "Mais de 5.000 noivas já confiaram em nossa experiência.",
      "Qualidade e Exclusividade",
      "Utilizamos os melhores materiais para criar peças atemporais."
    ];

    differentials.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  test("Botão de agendar atendimento redireciona corretamente", () => {
    renderWithProviders(<AboutUs />);

    const button = screen.getByRole("button", { name: /agendar atendimento/i });
    expect(button.closest("a")).toHaveAttribute(
      "href",
      "https://wa.me/+5535998289198"
    );
  });
});
