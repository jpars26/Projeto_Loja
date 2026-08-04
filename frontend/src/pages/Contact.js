// src/pages/Contact.js

import { Helmet } from "react-helmet-async";
import ContactForm from "../components/ContactForm";
import Layout from "../layout/Layout";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { useReveal } from "../hooks/useReveal";

const Contact = () => {
    const heroRef = useReveal();
    const infoRef = useReveal();
    const formRef = useReveal();
    const faqRef = useReveal();
    const mapRef = useReveal();

    return (
        <Layout>
            {/* 🔹 SEO para melhor indexação */}
            <Helmet>
                <title>Fale Conosco - Iara Noivas</title>
                <meta name="description" content="Entre em contato para saber mais sobre nossos vestidos de noiva e agendar um atendimento personalizado." />
                <meta property="og:title" content="Fale Conosco - Iara Noivas" />
                <meta property="og:description" content="Envie uma mensagem e fale diretamente com nossa equipe." />
                <meta property="og:url" content="https://www.iaranoivas.com/contact" />
                <meta property="og:type" content="website" />
            </Helmet>

            {/* 🔹 Hero Section com imagem impactante */}
            <section ref={heroRef} className="bg-ink px-4 py-16 text-center text-bone sm:px-6">
                <h1 className="font-display text-3xl font-medium sm:text-4xl">Vamos Conversar? </h1>
                <p className="mt-3 font-body text-sm text-bone/80 sm:text-base">
                    Estamos prontos para ajudar você a encontrar o vestido perfeito!
                </p>
                <a
                    href="https://wa.me/5535998127656"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-xl text-bone transition-transform hover:scale-110"
                >
                    <FaWhatsapp />
                </a>
            </section>

            {/* 🔹 Seção de Informações de Contato */}
            <section ref={infoRef} className="mx-auto grid max-w-5xl grid-cols-1 gap-px bg-hairline px-4 py-12 sm:grid-cols-3 sm:px-6">
                {/* Card Telefone/WhatsApp */}
                <a
                    href="https://wa.me/5535998127656?text=Olá, gostaria de mais informações sobre os vestidos da Iara Noivas!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-surface p-8 text-center transition-colors hover:bg-bone"
                >
                    <FaPhone className="mx-auto mb-3 text-2xl text-accent" />
                    <h3 className="font-display text-lg font-medium text-ink">Telefone / WhatsApp</h3>
                    <p className="mt-1 font-body text-sm text-ink/70">(35) 99812-7656</p>
                </a>

                {/* Card E-mail */}
                <a
                    href="mailto:iaranoivas2023@gmail.com?subject=Contato via site&body=Olá, estou entrando em contato através do site e gostaria de saber mais."
                    className="block bg-surface p-8 text-center transition-colors hover:bg-bone"
                >
                    <FaEnvelope className="mx-auto mb-3 text-2xl text-accent" />
                    <h3 className="font-display text-lg font-medium text-ink">E-mail</h3>
                    <p className="mt-1 font-body text-sm text-ink/70">iaranoivas2023@gmail.com</p>
                </a>

                {/* Card Endereço */}
                <a
                    href="https://www.google.com/maps/search/?api=1&query=Rua+Dr+Lisboa+231+Pouso+Alegre+MG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-surface p-8 text-center transition-colors hover:bg-bone"
                >
                    <FaMapMarkerAlt className="mx-auto mb-3 text-2xl text-accent" />
                    <h3 className="font-display text-lg font-medium text-ink">Endereço</h3>
                    <p className="mt-1 font-body text-sm text-ink/70">Rua Doutor Lisboa, Nº 231 – Pouso Alegre, MG</p>
                </a>
            </section>

            {/* 🔹 Seção de Perguntas Frequentes */}
            <section ref={faqRef} className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
                <h2 className="text-center font-display text-2xl font-medium text-ink sm:text-3xl">
                    Dúvidas Frequentes
                </h2>
                <div className="mt-8 space-y-6">
                    <div className="border-t border-hairline pt-4">
                        <h3 className="font-display text-base font-medium text-ink">
                            Como agendar uma prova de vestido?
                        </h3>
                        <p className="mt-1 font-body text-sm text-ink/70">
                            Entre em contato pelo WhatsApp ou pelo formulário para marcar um horário com nossa equipe.
                        </p>
                    </div>
                    <div className="border-t border-hairline pt-4">
                        <h3 className="font-display text-base font-medium text-ink">
                            Quais formas de pagamento são aceitas?
                        </h3>
                        <p className="mt-1 font-body text-sm text-ink/70">
                            Trabalhamos com cartão de crédito, PIX e parcelamento especial para noivas.
                        </p>
                    </div>
                    <div className="border-t border-hairline pt-4">
                        <h3 className="font-display text-base font-medium text-ink">
                            Preciso marcar horário para atendimento?
                        </h3>
                        <p className="mt-1 font-body text-sm text-ink/70">
                            Não, recomendamos o agendamento para pessoas interessadas em ver vestidos de noiva ou confeccionar seu vestido.
                        </p>
                    </div>
                </div>
            </section>
            {/* 🔹 Formulário de Contato */}
            <section ref={formRef} className="mx-auto max-w-2xl px-4 py-12 text-center sm:px-6">
                <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">Envie uma Mensagem</h2>
                <p className="mt-2 font-body text-sm text-ink/70">
                    Preencha o formulário abaixo e retornaremos o mais rápido possível.
                </p>
                <div className="mt-8 text-left">
                    <ContactForm />
                </div>
            </section>


            {/* 🔹 Mapa Interativo */}
            <section ref={mapRef} className="mx-auto max-w-5xl px-4 pb-16 text-center sm:px-6">
                <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">Nossa Localização</h2>
                <iframe
                    title="Mapa Iara Noivas"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.2023503143873!2d-45.93750692380367!3d-22.232400014119477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cbc7b120bbe1f7%3A0x63ca96a50f887b5b!2sAv.%20Dr.%20Lisboa%2C%20231%20-%20Pouso%20Alegre%2C%20MG%2C%2037550-000!5e0!3m2!1spt-BR!2sbr!4v1738947504078!5m2!1spt-BR!2sbr"
                    className="mt-6 h-[450px] w-full max-w-2xl border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </Layout>
    );
};

export default Contact;
