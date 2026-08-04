import CustomerGallery from '../components/CustomerGallery';
import Layout from '../layout/Layout';
import { Helmet } from "react-helmet-async";
import { FaCheckCircle, FaClock, FaStar } from "react-icons/fa";
import logo from "../assets/images/loguinho.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useReveal } from "../hooks/useReveal";

const TIMELINE = [
  { year: "2003", text: "Fundação da Iara Noivas, inspirada pelo amor à moda nupcial." },
  { year: "2010", text: "Começamos a criar vestidos sob medida, exclusivos para cada noiva." },
  { year: "2020", text: "Nossas peças se tornaram referência em casamentos de luxo." },
  { year: "2026", text: "Expandimos para novas coleções exclusivas." },
];

const DIFFERENTIALS = [
  { icon: FaCheckCircle, title: "Feitos Sob Medida", text: "Cada vestido é desenhado para refletir sua personalidade e estilo." },
  { icon: FaClock, title: "22 Anos de Tradição", text: "Mais de 5.000 noivas já confiaram em nossa experiência." },
  { icon: FaStar, title: "Qualidade e Exclusividade", text: "Utilizamos os melhores materiais para criar peças atemporais." },
];

const AboutUs = () => {
  const introRef = useReveal();
  const timelineRef = useReveal();
  const differentialsRef = useReveal();
  const galleryRef = useReveal();
  const ctaRef = useReveal();

  return (
    <Layout>
      {/* SEO para a página Sobre Nós */}
      <Helmet>
        <title>Sobre Nós - Iara Noivas</title>
        <meta
          name="description"
          content="Conheça a história da Iara Noivas e nossa paixão por criar vestidos de noiva inesquecíveis."
        />
        <meta property="og:title" content="Sobre Nós - Iara Noivas" />
        <meta
          property="og:description"
          content="Descubra como a Iara Noivas se tornou referência em vestidos de casamento sofisticados e elegantes."
        />
        <meta property="og:url" content="https://www.iaranoivas.com/about" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Seção Hero */}
      <section ref={introRef} className="bg-ink px-4 py-20 text-center text-bone sm:px-6">
        <h1 className="font-display text-3xl font-medium sm:text-4xl">
          Realizamos sonhos, um vestido por vez
        </h1>
        <p className="mt-3 font-body text-sm text-bone/80 sm:text-base">
          Transformamos momentos especiais em memórias inesquecíveis.
        </p>
      </section>

      {/* Nossa História - Timeline */}
      <section ref={timelineRef} className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">Nossa História</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE.map((item) => (
            <div key={item.year} className="border-t border-hairline pt-4">
              <span className="font-label text-xs uppercase tracking-wide text-accent">{item.year}</span>
              <p className="mt-2 font-body text-sm text-ink/70">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Diferenciais */}
      <section ref={differentialsRef} className="bg-surface px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
          Por que escolher a Iara Noivas?
        </h2>
        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-6">
          {DIFFERENTIALS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="w-64 border border-hairline p-6">
              <Icon className="mx-auto mb-3 text-2xl text-accent" />
              <h3 className="font-display text-lg font-medium text-ink">{title}</h3>
              <p className="mt-2 font-body text-sm text-ink/70">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Galeria de Clientes */}
      <section ref={galleryRef} className="px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">Noivas Felizes</h2>
        <LazyLoadImage src={logo} alt="Coleção Exclusiva" className="mx-auto mt-4 max-h-24 w-auto" />
        <CustomerGallery />
      </section>

      {/* Call to Action */}
      <section ref={ctaRef} className="bg-bone px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
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
    </Layout>
  );
};

export default AboutUs;
