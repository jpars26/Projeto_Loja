import React from "react";
import { Helmet } from "react-helmet";
import ContactForm from "../components/ContactForm";
import Layout from "../layout/Layout";
import "../css/Contact.css";
const Contact = () => {
    return (
        <Layout>
            

            <Helmet>
            <title>Fale Conosco - Iara Noivas</title>
            <meta name="description" content="Entre em contato conosco para saber mais sobre nossos vestidos de noiva e agendar um atendimento personalizado." />
            <meta property="og:title" content="Fale Conosco - Iara Noivas" />
            <meta property="og:description" content="Envie uma mensagem e fale diretamente com nossa equipe." />
            <meta property="og:url" content="https://www.iaranoivas.com/contact" />
            <meta property="og:type" content="website" />
            </Helmet>
        <section className="contact">
            <h2>Contato</h2>
            <p>Fale com a gente diretamente pelo whatsApp</p>
            <a href="https://wa.me/SEUNUMERO" target="_blank" rel="noopener noreferrer">
                <button>Entrar em contato</button>
            </a>
        </section>
            <ContactForm />
            
        </Layout>

        
    )
}

export default Contact;