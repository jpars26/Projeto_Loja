import React, { useState, useEffect } from "react";
import "../css/Chatbot.css"; // Arquivo de estilos
import { FaCommentDots, FaTimes } from "react-icons/fa"; // Ícones para abrir e fechar o chat

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // O chat começa minimizado
  const [isLoading, setIsLoading] = useState(false); // Controle do estado do envio

  // Salvar estado do chat no localStorage
  useEffect(() => {
    const chatState = localStorage.getItem("chatbot_open");
    setIsOpen(chatState === "true");
  }, []);

  // Mensagem inicial quando o chatbot é carregado
  useEffect(() => {
    setMessages([
      { sender: "bot", text: "Olá! 😊 Sou o assistente virtual da Iara Noivas. Como posso te ajudar?" }
    ]);
  }, []);

  // Enviar mensagem para o servidor (Worker)
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return; // Impede envio repetido

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput(""); // Apaga o input imediatamente após o envio
    setIsLoading(true); // Desativa o botão enquanto espera a resposta

    try {
      const response = await fetch("https://chat-iaranoivas.jpars131.workers.dev/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: data.answer || "Desculpe, não consegui entender. 😔" },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Erro ao buscar resposta." }]);
    }

    setIsLoading(false); // Reativa o botão após a resposta do bot
  };

  // Função para alternar a exibição do chat
  const toggleChat = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem("chatbot_open", newState); // Salvar estado no localStorage
  };

  return (
    <>
      {/* Ícone do chatbot flutuante */}
      {!isOpen && (
        <button className="chatbot-icon" onClick={toggleChat}>
          <FaCommentDots />
        </button>
      )}

      {/* Janela do chatbot */}
      <div className={`chatbot-container ${isOpen ? "chatbot-open" : ""}`}>
        <div className="chatbot-header">
          Assistente Iara Noivas
          <button className="chatbot-close" onClick={toggleChat}>
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
            disabled={isLoading} // Desativa input enquanto a resposta está carregando
          />
          <button onClick={sendMessage} disabled={isLoading}> {/* Desativa botão durante requisição */}
            {isLoading ? "Aguardando..." : "Enviar"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
