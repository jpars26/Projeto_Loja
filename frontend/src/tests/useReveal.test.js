import { render } from "@testing-library/react";
import gsap from "gsap";
import { useReveal } from "../hooks/useReveal";

function RevealedBox() {
  const ref = useReveal();
  return <div ref={ref}>conteúdo revelado</div>;
}

describe("useReveal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("anima o elemento de opacidade 0 para 1 via gsap.fromTo", () => {
    render(<RevealedBox />);

    expect(gsap.fromTo).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ opacity: 0, y: 24 }),
      expect.objectContaining({
        opacity: 1,
        y: 0,
        scrollTrigger: expect.objectContaining({ toggleActions: "play none none reverse" }),
      })
    );
  });

  test("registra a limpeza via gsap.context ao desmontar", () => {
    const { unmount } = render(<RevealedBox />);
    const contextResult = gsap.context.mock.results[0].value;

    unmount();

    expect(contextResult.revert).toHaveBeenCalled();
  });

  test("registra um branch para prefers-reduced-motion: reduce", () => {
    render(<RevealedBox />);

    const mmInstance = gsap.matchMedia.mock.results[0].value;
    expect(mmInstance.add).toHaveBeenCalledWith(
      "(prefers-reduced-motion: reduce)",
      expect.any(Function)
    );
  });
});
