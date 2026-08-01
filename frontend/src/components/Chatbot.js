import { useState, useEffect } from "react";
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
        <button
          className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl text-bone shadow-lg transition-colors hover:bg-ink"
          onClick={toggleChat}
        >
          <FaCommentDots />
        </button>
      )}

      {/* Janela do chatbot */}
      {isOpen && (
        <div className="fixed bottom-24 left-5 z-40 flex w-80 max-w-[90%] flex-col overflow-hidden border border-hairline bg-surface shadow-lg">
          <div className="flex items-center justify-between bg-ink px-4 py-3 font-label text-xs uppercase tracking-wide text-bone">
            Assistente Iara Noivas
            <button onClick={toggleChat} aria-label="Fechar chat" className="text-bone">
              <FaTimes />
            </button>
          </div>

          <div className="flex h-64 flex-col gap-2 overflow-y-auto p-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-3 py-2 font-body text-sm ${
                  msg.sender === "user"
                    ? "self-end bg-hairline/40 text-ink"
                    : "self-start bg-bone text-ink"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t border-hairline p-3">
            <input
              type="text"
              placeholder="Digite sua pergunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 border border-hairline px-2 py-1 font-body text-sm text-ink disabled:bg-hairline/20"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="border border-ink px-3 py-1 font-label text-xs uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-bone disabled:cursor-not-allowed disabled:border-hairline disabled:text-ink/40 disabled:hover:bg-transparent"
            >
              {isLoading ? "Aguardando..." : "Enviar"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
