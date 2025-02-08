import React, { useState } from "react";
import "../css/ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    telefone: "",
  });

  // Validação do Email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validação do Telefone (Deve ter 10 ou 11 dígitos)
  const validateTelefone = (telefone) => {
    const phoneRegex = /^[0-9]{10,11}$/; // Apenas números, entre 10 e 11 dígitos
    return phoneRegex.test(telefone);
  };

  // Manipulação da mudança nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Impede caracteres no campo telefone (aceita apenas números)
    if (name === "telefone") {
      const numericValue = value.replace(/\D/g, ""); // Remove tudo que não for número
      setFormData({ ...formData, [name]: numericValue });

      // Valida o telefone
      setErrors({
        ...errors,
        telefone: validateTelefone(numericValue)
          ? ""
          : "Digite um número válido (com DDD)",
      });

      return;
    }

    // Validação de Email em tempo real
    if (name === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value) ? "" : "Digite um e-mail válido",
      });
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se os campos são válidos antes de enviar
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: "Digite um e-mail válido" });
      return;
    }

    if (!validateTelefone(formData.telefone)) {
      setErrors({ ...errors, telefone: "Digite um número válido (com DDD)" });
      return;
    }

    // Enviar os dados do formulário para o backend
    const response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.success) {
      alert("Mensagem enviada com sucesso!");
      setFormData({
        name: "",
        email: "",
        telefone: "",
        message: "",
      });
    } else {
      alert("Erro ao enviar a mensagem.");
    }
  };

  return (
    <section id="contact">
      <h2>Entre em Contato</h2>
      <p>Nos envie uma mensagem e ajudaremos com carinho! 💕</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
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
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="buttonForms">Enviar Mensagem</button>
      </form>
    </section>
  );
};

export default ContactForm;
