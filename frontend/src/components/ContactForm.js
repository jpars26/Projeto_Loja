import React, { useState } from "react";
import "../css/ContactForm.css";
import { db, collection, addDoc, serverTimestamp } from "../config/firebase"; 


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
      <h2>Entre em Contato</h2>
      <p>Nos envie uma mensagem e ajudaremos com carinho! 💕</p>

      {successMessage && <p className="success-message animate-success">{successMessage}</p>}
      {errors.form && <p className="error-text">{errors.form}</p>}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            maxLength="11"
            placeholder="(XX) XXXXX-XXXX"
          />
          {errors.telefone && <span className="error-text">{errors.telefone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Tem alguma dúvida? Nos mande uma mensagem! 💌</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
          {errors.message && <span className="error-text">{errors.message}</span>}
        </div>

        <button type="submit" className="buttonForms" disabled={loading}>
          {loading ? "Enviando..." : "Enviar Mensagem"}
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
