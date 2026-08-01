import { render } from "@testing-library/react";
import gsap from "gsap";
import { usePinnedChapter } from "../hooks/usePinnedChapter";

function ThreeItemChapter() {
  const { sectionRef, setItemRef } = usePinnedChapter(3);
  return (
    <section ref={sectionRef} data-testid="chapter">
      <div ref={setItemRef(0)}>Item Um</div>
      <div ref={setItemRef(1)}>Item Dois</div>
      <div ref={setItemRef(2)}>Item Três</div>
    </section>
  );
}

describe("usePinnedChapter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("cria uma timeline gsap com scrollTrigger pinado quando seção e itens estão montados", () => {
    render(<ThreeItemChapter />);

    expect(gsap.timeline).toHaveBeenCalledWith(
      expect.objectContaining({
        scrollTrigger: expect.objectContaining({ pin: true, scrub: 1 }),
      })
    );
  });

  test("mantém todos os itens no DOM independente do estado da animação", () => {
    const { getByText } = render(<ThreeItemChapter />);

    expect(getByText("Item Um")).toBeInTheDocument();
    expect(getByText("Item Dois")).toBeInTheDocument();
    expect(getByText("Item Três")).toBeInTheDocument();
  });

  test("limpa a timeline ao desmontar", () => {
    const { unmount } = render(<ThreeItemChapter />);
    const contextResult = gsap.context.mock.results[0].value;

    unmount();

    expect(contextResult.revert).toHaveBeenCalled();
  });

  test("registra um branch para prefers-reduced-motion: reduce", () => {
    render(<ThreeItemChapter />);

    const mmInstance = gsap.matchMedia.mock.results[0].value;
    expect(mmInstance.add).toHaveBeenCalledWith(
      "(prefers-reduced-motion: reduce)",
      expect.any(Function)
    );
  });
});
