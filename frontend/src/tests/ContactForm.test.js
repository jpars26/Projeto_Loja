import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "../components/ContactForm"; // Caminho para seu componente
import {  waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";


describe("ContactForm Component", () => {
  test("Renderiza corretamente os campos do formulário", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tem alguma dúvida?/i)).toBeInTheDocument();
  });

  test("Valida que o telefone aceita apenas números", () => {
    render(<ContactForm />);
    const telefoneInput = screen.getByLabelText(/Telefone/i);
    fireEvent.change(telefoneInput, { target: { value: "abc123" } });
    expect(telefoneInput.value).toBe("123"); // Apenas números
  });

  test("Valida que o e-mail precisa ser válido", async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/E-mail/i);
    fireEvent.change(emailInput, { target: { value: "email-invalido" } });
    fireEvent.blur(emailInput); // Simula perda de foco para ativar validação
    expect(screen.getByText(/Digite um e-mail válido/i)).toBeInTheDocument();
  });

  test("Submete o formulário com valores válidos", async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "Maria" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "teste@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/Telefone/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Tem alguma dúvida?/i), {
      target: { value: "Olá, quero saber mais!" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Enviar Mensagem/i }));

    // 🔹 Aguarda o reset dos campos após submissão
    await waitFor(() => {
      expect(screen.getByLabelText(/Nome/i).value).toBe("");
      expect(screen.getByLabelText(/E-mail/i).value).toBe("");
      expect(screen.getByLabelText(/Telefone/i).value).toBe("");
      expect(screen.getByLabelText(/Tem alguma dúvida?/i).value).toBe("");
    });
  });
});
