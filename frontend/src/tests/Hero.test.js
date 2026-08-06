import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Hero from "../components/Hero";

describe("Hero Component", () => {
  test("aplica recorte ajustado para mobile e reverte para centro em telas maiores", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );

    const video = screen.getByTestId("hero-section").querySelector("video");
    expect(video).toHaveClass("object-[center_20%]");
    expect(video).toHaveClass("sm:object-center");
    expect(video).toHaveClass("scale-110");
  });

  test("exibe o texto principal e o link para a coleção", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );

    expect(screen.getByText("Há mais de 20 anos contando histórias através de vestidos")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver coleção/i })).toHaveAttribute("href", "/collections");
  });
});
