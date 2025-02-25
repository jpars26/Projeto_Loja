import React, { useState, useEffect } from "react";
import "../css/Chatbot.css"; // Criar um CSS para estilizar o chat
import { FaCommentDots, FaTimes } from "react-icons/fa";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/fechar chat

  // Mensagem inicial quando o chatbot é carregado
  useEffect(() => {
    setMessages([
      { sender: "bot", text: "Olá! 😊 Sou o assistente virtual da Iara Noivas. Como posso te ajudar?" }
    ]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch("https://chat-iaranoivas.jpars131.workers.dev/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("🔍 Resposta da API:", data); // Log no console para debug

      if (!data.answer) {
        throw new Error("Resposta inválida da API");
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: data.answer },
      ]);
    } catch (error) {
      console.error("❌ Erro ao buscar resposta:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Erro ao buscar resposta. Tente novamente mais tarde." },
      ]);
    }

    setInput("");
  };

  return (
    <>
      {/* Ícone do chatbot flutuante */}
      {!isOpen && (
        <button className="chatbot-icon" onClick={() => setIsOpen(true)}>
          <FaCommentDots />
        </button>
      )}

      {/* Janela do chatbot */}
      <div className={`chatbot-container ${isOpen ? "chatbot-open" : ""}`}>
        <div className="chatbot-header">
          Assistente Iara Noivas
          <button className="chatbot-close" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chatbot-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Digite sua pergunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()} // Enviar ao pressionar Enter
          />
          <button onClick={sendMessage}>Enviar</button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
