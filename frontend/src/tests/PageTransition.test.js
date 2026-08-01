import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import gsap from "gsap";
import PageTransition from "../components/PageTransition";

describe("PageTransition", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza os filhos normalmente", () => {
    render(
      <MemoryRouter>
        <PageTransition>
          <div>Conteúdo da página</div>
        </PageTransition>
      </MemoryRouter>
    );

    expect(screen.getByText("Conteúdo da página")).toBeInTheDocument();
  });

  test("dispara o fade de entrada via gsap ao montar", () => {
    render(
      <MemoryRouter>
        <PageTransition>
          <div>Conteúdo</div>
        </PageTransition>
      </MemoryRouter>
    );

    expect(gsap.fromTo).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ opacity: 0 }),
      expect.objectContaining({ opacity: 1 })
    );
  });
});
