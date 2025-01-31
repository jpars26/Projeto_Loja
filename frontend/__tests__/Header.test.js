import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // ✅ Simula o React Router
import Header from "../src/components/Header";
import { MoodboardProvider } from "../src/context/MoodboardContext";

test("Renderiza corretamente o título no Header", () => {
  render(
    <MemoryRouter> {/* ✅ Envolve o Header para simular o Router */}
      <MoodboardProvider>
        <Header />
      </MoodboardProvider>
    </MemoryRouter>
  );

  expect(screen.getByText("Iara Noivas")).toBeInTheDocument();
});
