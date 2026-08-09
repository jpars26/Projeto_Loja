import { render, screen } from "@testing-library/react";
import WhatsAppButton from "../components/WhatsAppButton";

jest.mock("../context/MoodboardContext");

import { useMoodboard } from "../context/MoodboardContext";

describe("WhatsAppButton", () => {
  test("sem favoritos, usa a mensagem padrão da loja", () => {
    useMoodboard.mockReturnValue({ moodboardItems: [] });
    render(<WhatsAppButton />);

    const link = screen.getByLabelText("Contato pelo WhatsApp");
    expect(link.getAttribute("href")).toContain("wa.me/5535998127656");
    expect(decodeURIComponent(link.getAttribute("href"))).toContain(
      "gostaria de mais informações sobre os vestidos"
    );
  });

  test("com favoritos, usa a mensagem com a lista de vestidos favoritados", () => {
    useMoodboard.mockReturnValue({ moodboardItems: [{ name: "Modernice" }, { name: "Clássico" }] });
    render(<WhatsAppButton />);

    const link = screen.getByLabelText("Contato pelo WhatsApp");
    const decodedHref = decodeURIComponent(link.getAttribute("href"));
    expect(decodedHref).toContain("Modernice");
    expect(decodedHref).toContain("Clássico");
  });
});
