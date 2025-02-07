import React, { useState } from 'react';
import '../css/ContactForm.css';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Enviar os dados do formulário para o backend
    const response = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.success) {
      alert('Mensagem enviada com sucesso!');
      setFormData({
        name: '',
        email: '',
        telefone: '',
        message: ''
      });
      
    } else {
      alert('Erro ao enviar a mensagem.');
    }
  };

  return (
    <section id="contact">
      <h2>Contato</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
          <label htmlFor="email">E-mail</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="telefone">Telefone</label>
          <textarea 
            id="telefone" 
            mask="(99) 99999-9999"
            type="tel"
            name="telefone" 
            value={formData.telefone} 
            onChange={handleChange} 
            required
          />
        </div>
        <div>
          <label htmlFor="message">Tem alguma duvida, pode nos mandar!</label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
};

export default ContactForm;
