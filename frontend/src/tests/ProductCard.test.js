import { render, screen, fireEvent } from "@testing-library/react";
import { MoodboardProvider } from "../context/MoodboardContext";
import ProductCard from "../components/ProductCard";

const product = { id: "vestidos-petrova-p1", name: "Modernice", image: "p1.jpg" };

const renderCard = (children = <ProductCard product={product} />) =>
  render(<MoodboardProvider>{children}</MoodboardProvider>);

describe("ProductCard", () => {
  test("Renderiza o nome e a imagem do produto", () => {
    renderCard();
    expect(screen.getByText("Modernice")).toBeInTheDocument();
    expect(screen.getByAltText("Modernice")).toBeInTheDocument();
  });

  test("Favoritar muda o estado visual do botão de coração", () => {
    renderCard();
    const favoriteButton = screen.getByLabelText("Favoritar");
    expect(favoriteButton).toHaveClass("text-ink");

    fireEvent.click(favoriteButton);
    expect(favoriteButton).toHaveClass("text-accent");
  });

  test("Botão Curtir também adiciona/remove dos favoritos", () => {
    renderCard();
    fireEvent.click(screen.getByLabelText("Curtir"));
    expect(screen.getByLabelText("Favoritar")).toHaveClass("text-accent");

    fireEvent.click(screen.getByLabelText("Curtir"));
    expect(screen.getByLabelText("Favoritar")).toHaveClass("text-ink");
  });

  test("Clique no botão do WhatsApp não propaga pro elemento pai", () => {
    const parentClick = jest.fn();
    render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div onClick={parentClick}>
        <MoodboardProvider>
          <ProductCard product={product} />
        </MoodboardProvider>
      </div>
    );

    fireEvent.click(screen.getByLabelText("Compartilhar no WhatsApp"));
    expect(parentClick).not.toHaveBeenCalled();
  });

  test("Clique no botão do WhatsApp abre conversa com a loja mencionando o vestido", () => {
    const openSpy = jest.spyOn(window, "open").mockImplementation(() => {});
    renderCard();

    fireEvent.click(screen.getByLabelText("Compartilhar no WhatsApp"));

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url] = openSpy.mock.calls[0];
    expect(url).toContain("wa.me/5535998127656");
    expect(decodeURIComponent(url)).toContain("Modernice");

    openSpy.mockRestore();
  });

  test("Clique no botão Compartilhar não propaga pro elemento pai", () => {
    // jsdom não implementa navigator.clipboard/window.alert; mocka pra shareCurrentPage não quebrar.
    Object.assign(navigator, { clipboard: { writeText: jest.fn().mockResolvedValue() } });
    jest.spyOn(window, "alert").mockImplementation(() => {});

    const parentClick = jest.fn();
    render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div onClick={parentClick}>
        <MoodboardProvider>
          <ProductCard product={product} />
        </MoodboardProvider>
      </div>
    );

    fireEvent.click(screen.getByLabelText("Compartilhar"));
    expect(parentClick).not.toHaveBeenCalled();
  });
});
