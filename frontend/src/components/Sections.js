import { Link } from "react-router-dom";
import { FaCheckCircle, FaQuoteLeft, FaStar } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import testimonials from "../data/testimonials";
import collectionsHomePage from "../data/collectionsHomePage";

const Sections = () => {
  // Configurações do carrossel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: false,
    arrows: false,
  };

  // Lista com os diferenciais e links de WhatsApp com mensagens personalizadas
  const differentials = [
    {
      title: "Feitos Sob Medida",
      desc: "Temos o serviço de confecção para você que procura algo exclusivo",
      whatsappMessage: "Olá, estou interessada no serviço de confecção sob medida da Iara Noivas. Pode me passar mais informações?",
    },
    {
      title: "Materiais de Alta Qualidade",
      desc: "Usamos os tecidos mais sofisticados para garantir luxo e conforto.",
      whatsappMessage: "Olá, gostaria de saber mais sobre os vestidos da Iara Noivas. Pode me contar mais?",
    },
    {
      title: "Atendimento Personalizado",
      desc: "Nossa equipe ajuda você em cada etapa para escolher o vestido perfeito.",
      whatsappMessage: "Olá, gostaria de agendar um atendimento personalizado para me ajudar a escolher meu vestido. Vocês podem me ajudar?",
    }
  ];

  // Função para gerar link do WhatsApp com mensagem
  const getWhatsAppLink = (message) => {
    const phoneNumber = "5535998127656"; // Seu número com DDD
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <div className="font-body text-ink" data-testid="diferencial-section">
      {/* 📌 Bloco Diferenciais */}
      <section className="bg-bone px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
          Por que Escolher a Iara Noivas?
        </h2>
        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-6">
          {differentials.map((item, index) => (
            <a
              key={index}
              href={getWhatsAppLink(item.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-64 border border-hairline bg-surface p-6 text-center transition-colors hover:border-accent"
            >
              <FaCheckCircle className="mx-auto mb-3 text-2xl text-accent" />
              <h3 className="font-display text-lg font-medium text-ink">{item.title}</h3>
              <p className="mt-2 font-body text-sm text-ink/70">{item.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 📌 Bloco Produtos e Depoimentos lado a lado */}
      <section className="bg-surface px-4 py-16 text-center sm:px-6" data-testid="dual-section">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:divide-x md:divide-hairline">
          <div className="flex flex-col items-center md:pr-8">
            <h2 className="font-display text-xl font-medium text-ink sm:text-2xl">
              Descubra Nossos Vestidos Exclusivos
            </h2>
            <FaStar className="my-3 text-xl text-accent" />
            <p className="max-w-sm font-body text-sm text-ink/70">
              Modelos feitos para tornar seu dia ainda mais especial.
            </p>

            <div className="mt-6 w-full max-w-sm">
              <Slider {...sliderSettings}>
                {collectionsHomePage.map((collection, index) => (
                  <div key={index} className="px-1 text-center">
                    <LazyLoadImage
                      src={collection.image}
                      alt={collection.name}
                      className="aspect-[3/4] w-full object-cover"
                    />
                    <p className="mt-3 font-label text-xs uppercase tracking-wide text-ink/70">
                      {collection.name}
                    </p>
                  </div>
                ))}
              </Slider>
            </div>

            <Link
              to="/collections"
              className="mt-8 inline-block border border-ink px-5 py-2 font-label text-xs uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-bone"
            >
              Ver Coleção
            </Link>
          </div>

          <div
            className="flex flex-col items-center md:pl-8"
            data-testid="testimonials-section"
          >
            <h2 className="font-display text-xl font-medium text-ink sm:text-2xl">
              Sonhos que Viraram Realidade
            </h2>
            <FaQuoteLeft className="my-3 text-xl text-accent" />
            <p className="max-w-sm font-body text-sm text-ink/70">
              Nossas noivas contam suas histórias inesquecíveis.
            </p>

            <div className="mt-6 w-full max-w-sm pb-10">
              <Slider {...sliderSettings}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="border-l-2 border-accent bg-bone p-6 text-left">
                    <LazyLoadImage
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <p className="mt-3 font-body text-sm italic text-ink/80">{testimonial.text}</p>
                    <h4 className="mt-2 font-label text-xs uppercase tracking-wide text-ink">
                      - {testimonial.name}
                    </h4>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* 📌 Bloco CTA Final */}
      <section className="bg-bone px-4 py-16 text-center sm:px-6" data-testid="cta-section">
        <h2 className="font-display text-xl font-medium text-ink sm:text-2xl">
          Pronta para Encontrar o Vestido dos Seus Sonhos?
        </h2>
        <p className="mt-2 font-body text-sm text-ink/70">
          Entre em contato e agende uma consultoria exclusiva.
        </p>
        <a href="https://wa.me/+5535998127656" target="_blank" rel="noopener noreferrer">
          <button className="mt-6 border border-accent bg-accent px-5 py-2 font-label text-xs uppercase tracking-wide text-bone transition-colors hover:bg-transparent hover:text-accent">
            Agendar Atendimento
          </button>
        </a>
      </section>
    </div>
  );
};

export default Sections;
