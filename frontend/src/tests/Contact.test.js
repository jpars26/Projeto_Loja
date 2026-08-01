import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Contact from "../pages/Contact";

jest.mock("../context/MoodboardContext", () => ({
  useMoodboard: () => ({ moodboardItems: [] }),
}));

const renderPage = () =>
  render(
    <HelmetProvider>
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    </HelmetProvider>
  );

describe("Contact Page", () => {
  test("Renderiza as seções principais", () => {
    renderPage();

    expect(screen.getByRole("heading", { name: /vamos conversar/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /envie uma mensagem/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /dúvidas frequentes/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /nossa localização/i })).toBeInTheDocument();
  });

  test("SEO está configurado corretamente", async () => {
    renderPage();
    expect(document.title).toBe("Fale Conosco - Iara Noivas");
  });
});
