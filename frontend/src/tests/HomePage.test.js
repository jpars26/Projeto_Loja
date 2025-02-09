import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // Para testar meta tags
import HomePage from "../pages/HomePage";
import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";


// 🔹 Mock do Contexto Moodboard
jest.mock("../context/MoodboardContext", () => ({
    useMoodboard: () => ({
      moodboardItems: [],
    }),
  }));

describe("HomePage Component", () => {
  test("Renderiza corretamente os elementos principais", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </HelmetProvider>
    );
    
    // 🔹 Verifica se os componentes principais aparecem
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("diferencial-section")).toBeInTheDocument();
    expect(screen.getByTestId("dual-section")).toBeInTheDocument();
    expect(screen.getByTestId("testimonials-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("instagram-widget")).toBeInTheDocument();
    const whatsappButtons = screen.queryAllByTestId("whatsapp-button-main");
    expect(whatsappButtons.length).toBeGreaterThan(0); // Pelo menos um botão deve existir


  });

  test("SEO está configurado corretamente", async () => {
    render(
        <HelmetProvider>
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>
        </HelmetProvider>
    );

    // 🔹 Aguarda a atualização do título da página
    await waitFor(() => {
        expect(document.title).toBe("Iara Noivas - Vestidos de Noiva Exclusivos");
    });

    // 🔹 Verifica a meta descrição
    await waitFor(() => {
        const metaDescription = document.querySelector('meta[name="description"]');
        expect(metaDescription).toHaveAttribute("content", "Os vestidos de noiva mais sofisticados para seu casamento dos sonhos.");
    });
    });
});
