import { render } from "@testing-library/react";
import gsap from "gsap";
import { useParallax } from "../hooks/useParallax";

function ParallaxBox() {
  const ref = useParallax({ distance: 60 });
  return <div ref={ref}>fundo</div>;
}

describe("useParallax", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("anima o elemento em modo scrub, do metade negativa à metade positiva da distância", () => {
    render(<ParallaxBox />);

    expect(gsap.fromTo).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ y: -30 }),
      expect.objectContaining({
        y: 30,
        ease: "none",
        scrollTrigger: expect.objectContaining({ scrub: true }),
      })
    );
  });

  test("limpa a animação ao desmontar", () => {
    const { unmount } = render(<ParallaxBox />);
    const contextResult = gsap.context.mock.results[0].value;

    unmount();

    expect(contextResult.revert).toHaveBeenCalled();
  });
});
