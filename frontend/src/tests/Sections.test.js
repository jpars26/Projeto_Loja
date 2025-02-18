import React from "react";
import { render, screen } from "@testing-library/react";
import Sections from "../components/Sections";

import { BrowserRouter } from "react-router-dom";

describe("Sections Component", () => {
  const renderComponent = () => {
    render(
      <BrowserRouter>
        <Sections />
      </BrowserRouter>
    );
  };

  test("Renderiza a seção de diferenciais", () => {
    renderComponent();
    expect(screen.getByTestId("diferencial-section")).toBeInTheDocument();
  });

  test("Renderiza a seção de carrossel de vestidos e depoimentos", () => {
    renderComponent();
    expect(screen.getByTestId("dual-section")).toBeInTheDocument();
    expect(screen.getByTestId("testimonials-section")).toBeInTheDocument();
  });

  test("Renderiza a seção de call-to-action (CTA)", () => {
    renderComponent();
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
  });

  test("O botão de agendar atendimento está presente", () => {
    renderComponent();
    const ctaButton = screen.getByRole("button", { name: /agendar atendimento/i });
    expect(ctaButton).toBeInTheDocument();
  });
});
