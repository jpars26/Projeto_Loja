import { render, screen } from "@testing-library/react";
import { MoodboardProvider } from "../src/context/MoodboardContext";
import Header from "../src/components/Header";
import { MemoryRouter } from "react-router-dom"; // ✅ Simula o React Router

test("Exibe a notificação quando há itens no Moodboard", () => {
  render(
    <MemoryRouter>
        <MoodboardProvider>
            <Header />
        </MoodboardProvider>
    </MemoryRouter>
    
  );

  expect(screen.queryByText("1")).not.toBeInTheDocument(); // Antes de adicionar

  // Simula a adição de um item ao moodboard
  render(
    <MemoryRouter>
        <MoodboardProvider>
            <Header />
        </MoodboardProvider>
    </MemoryRouter>
  );

  expect(screen.getByText("1")).toBeInTheDocument(); // Deve aparecer após adicionar
});
