import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CollectionsHub from "../components/CollectionsHub";

const renderHub = () =>
  render(
    <BrowserRouter>
      <CollectionsHub />
    </BrowserRouter>
  );

describe("CollectionsHub", () => {
  test("Mostra o título principal e a introdução", () => {
    renderHub();
    expect(
      screen.getByRole("heading", { level: 1, name: "Encontre o look perfeito para o seu momento" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Descubra nossas coleções e encontre o visual ideal para uma ocasião inesquecível."
      )
    ).toBeInTheDocument();
  });

  test("Mostra um card por categoria com título, descrição e CTA sempre visíveis", () => {
    renderHub();

    expect(screen.getByRole("heading", { level: 2, name: "Vestidos de Noiva" })).toBeInTheDocument();
    expect(screen.getByText("Para o seu grande dia.")).toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 2, name: "Ternos" })).toBeInTheDocument();
    expect(screen.getByText("Elegância para momentos especiais.")).toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 2, name: "Vestidos de Festa" })).toBeInTheDocument();
    expect(screen.getByText("Para celebrar ocasiões inesquecíveis.")).toBeInTheDocument();

    expect(screen.getAllByText("Conheça a coleção →")).toHaveLength(3);
  });

  test("Cada card é um link inteiro, na ordem noivas/ternos/festa", () => {
    renderHub();

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "/collections/noivas");
    expect(links[1]).toHaveAttribute("href", "/collections/ternos");
    expect(links[2]).toHaveAttribute("href", "/collections/festa");
  });

  test("Imagens têm texto alternativo descritivo", () => {
    renderHub();
    expect(screen.getByAltText("Vestido de noiva da coleção Alvor, Iara Noivas")).toBeInTheDocument();
    expect(screen.getByAltText("Ternos Iara Noivas — fotos em breve")).toBeInTheDocument();
    expect(
      screen.getByAltText("Vestido de festa azul-marinho estilo princesa, Iara Noivas")
    ).toBeInTheDocument();
  });
});
