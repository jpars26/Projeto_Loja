import {
  STORE_PHONE_NUMBER,
  buildWhatsAppUrl,
  getDefaultMessage,
  getFavoritesMessage,
  getSingleDressMessage,
} from "../utils/whatsapp";

describe("whatsapp utils", () => {
  test("buildWhatsAppUrl monta a URL com número e mensagem codificada", () => {
    const url = buildWhatsAppUrl("5535998127656", "Olá mundo");
    expect(url).toBe("https://wa.me/5535998127656?text=Ol%C3%A1%20mundo");
  });

  test("getDefaultMessage retorna a mensagem genérica da loja", () => {
    expect(getDefaultMessage()).toMatch(/Iara Noivas/);
  });

  test("getFavoritesMessage lista todos os vestidos favoritados", () => {
    const message = getFavoritesMessage([{ name: "Modernice" }, { name: "Clássico" }]);
    expect(message).toContain("- Modernice");
    expect(message).toContain("- Clássico");
  });

  test("getSingleDressMessage menciona o vestido e o link da página", () => {
    const message = getSingleDressMessage("Modernice", "https://loja.com/collections/x");
    expect(message).toContain("Modernice");
    expect(message).toContain("https://loja.com/collections/x");
  });

  test("STORE_PHONE_NUMBER é o número único da loja", () => {
    expect(STORE_PHONE_NUMBER).toBe("5535998127656");
  });
});
