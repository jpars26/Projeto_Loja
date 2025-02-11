import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "../components/ContactForm";
import "@testing-library/jest-dom";
import { getFirestore } from "firebase/firestore";
import { getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// 🔹 Mocka o Firebase Analytics para evitar erros durante os testes
jest.mock("firebase/analytics", () => ({
  getAnalytics: jest.fn(() => null),
  isSupported: jest.fn(() => Promise.resolve(false)),
}));

// ✅ Verifica se o Firebase já foi inicializado
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Somente inicia o Analytics se for suportado
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// ✅ Exporta Firebase para evitar inicializações duplicadas em outros arquivos
export { app, db, analytics };

describe("ContactForm Component", () => {
  
  test("Renderiza corretamente os campos do formulário", async () => {
    render(<ContactForm />);

    // 🔹 Aguarde a renderização antes de verificar os campos
    await waitFor(() => {
      expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Telefone/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Tem alguma dúvida?/i)).toBeInTheDocument();
    });
  });

  test("Valida que o telefone aceita apenas números", () => {
    render(<ContactForm />);
    const telefoneInput = screen.getByLabelText(/Telefone/i);
    fireEvent.change(telefoneInput, { target: { value: "abc123" } });
    expect(telefoneInput.value).toBe("123"); // Apenas números
  });

  test("Valida que o e-mail precisa ser válido", async () => {
    render(<ContactForm />);
  
    const emailInput = screen.getByLabelText("E-mail");
  
    // Simula a digitação de um e-mail inválido
    fireEvent.change(emailInput, { target: { value: "email-invalido" } });
  
    // Simula o clique no botão de enviar para acionar a validação
    fireEvent.click(screen.getByRole("button", { name: /enviar mensagem/i }));
  
    // 🔹 Aguarde a mensagem de erro ser renderizada no DOM
    await waitFor(() => {
      expect(screen.getByText(/Digite um e-mail válido/i)).toBeInTheDocument();
    });
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
  
    // 🔹 Aguarde o sucesso da submissão antes de verificar se os campos foram resetados
    await waitFor(() => expect(screen.getByText(/Mensagem enviada com sucesso!/i)).toBeInTheDocument());
  
    // 🔹 Agora verifique se os campos foram resetados
    await waitFor(() => {
      expect(screen.getByLabelText(/Nome/i).value).toBe("");
      expect(screen.getByLabelText(/E-mail/i).value).toBe("");
      expect(screen.getByLabelText(/Telefone/i).value).toBe("");
      expect(screen.getByLabelText(/Tem alguma dúvida?/i).value).toBe("");
    });
  });

});
