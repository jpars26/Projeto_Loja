import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header"; 
import { MoodboardProvider } from "../context/MoodboardContext"; 
import "@testing-library/jest-dom";

describe("Navbar do Header", () => {
  test("Renderiza corretamente os links de navegação", () => {
    render(
      <BrowserRouter>
        <MoodboardProvider>
          <Header />
        </MoodboardProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole("link", { name: /início/i })).toHaveAttribute("href", "/home");
    expect(screen.getByRole("link", { name: /coleção/i })).toHaveAttribute("href", "/collections");
    expect(screen.getByRole("link", { name: /sobre/i })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: /contato/i })).toHaveAttribute("href", "/contact");
  });

  test("O menu hambúrguer abre e fecha corretamente", () => {
    render(
      <BrowserRouter>
        <MoodboardProvider>
          <Header />
        </MoodboardProvider>
      </BrowserRouter>
    );

    const menuButton = screen.getByRole("button"); // Seleciona o botão do menu
    expect(menuButton).toBeInTheDocument();

    // Simula o clique para abrir o menu
    fireEvent.click(menuButton);
    expect(screen.getByRole("navigation")).toHaveClass("open"); // Verifica se o menu abre

    // Simula outro clique para fechar o menu
    fireEvent.click(menuButton);
    expect(screen.getByRole("navigation")).not.toHaveClass("open"); // Verifica se o menu fecha
  });
});
