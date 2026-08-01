import { useState } from "react";
import { db, collection, addDoc, serverTimestamp } from "../config/firebase";

const inputClass =
  "mt-1 w-full border border-hairline bg-surface px-3 py-2 font-body text-sm text-ink focus:border-accent focus:outline-none";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Validações
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateTelefone = (telefone) => /^[0-9]{10,11}$/.test(telefone);

  // Manipulação dos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "telefone") {
      newValue = value.replace(/\D/g, ""); // Remove tudo que não for número
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Envio do formulário para o Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!validateEmail(formData.email)) newErrors.email = "Digite um e-mail válido";
    if (!validateTelefone(formData.telefone)) newErrors.telefone = "Digite um número válido (com DDD)";
    if (!formData.name) newErrors.name = "O nome é obrigatório";
    if (!formData.message) newErrors.message = "A mensagem não pode estar vazia";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        telefone: formData.telefone,
        message: formData.message,
        createdAt: serverTimestamp(),
      });

      setSuccessMessage("Mensagem enviada com sucesso!");
      setFormData({ name: "", email: "", telefone: "", message: "" });
    } catch (error) {
      setErrors({ form: "Erro ao salvar no banco de dados. Tente novamente." });
      console.error("Erro ao salvar no Firestore:", error);
    }

    setLoading(false);
  };

  return (
    <section id="contact">
      <h2 className="font-display text-2xl font-medium text-ink">Entre em Contato</h2>
      <p className="mt-2 font-body text-sm text-ink/70">
        Nos envie uma mensagem e ajudaremos com carinho! 💕
      </p>

      {successMessage && (
        <p className="mt-4 font-body text-sm text-accent">{successMessage}</p>
      )}
      {errors.form && <p className="mt-4 font-body text-sm text-red-600">{errors.form}</p>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="font-label text-xs uppercase tracking-wide text-ink/70">
            Nome
          </label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClass} />
          {errors.name && <span className="mt-1 block font-body text-xs text-red-600">{errors.name}</span>}
        </div>

        <div>
          <label htmlFor="email" className="font-label text-xs uppercase tracking-wide text-ink/70">
            E-mail
          </label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} />
          {errors.email && <span className="mt-1 block font-body text-xs text-red-600">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="telefone" className="font-label text-xs uppercase tracking-wide text-ink/70">
            Telefone
          </label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            maxLength="11"
            placeholder="(XX) XXXXX-XXXX"
            className={inputClass}
          />
          {errors.telefone && <span className="mt-1 block font-body text-xs text-red-600">{errors.telefone}</span>}
        </div>

        <div>
          <label htmlFor="message" className="font-label text-xs uppercase tracking-wide text-ink/70">
            Tem alguma dúvida? Nos mande uma mensagem! 💌
          </label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} className={inputClass} />
          {errors.message && <span className="mt-1 block font-body text-xs text-red-600">{errors.message}</span>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="border border-ink px-5 py-2 font-label text-xs uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-bone disabled:cursor-not-allowed disabled:border-hairline disabled:text-ink/40"
        >
          {loading ? "Enviando..." : "Enviar Mensagem"}
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
