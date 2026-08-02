import { FaInstagram, FaFacebookF, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../assets/images/loguinho.webp";

const Footer = () => {
  return (
    <footer className="bg-ink px-4 py-12 text-bone sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 border-b border-bone/15 pb-8 text-center">
        <LazyLoadImage src={logo} alt="Iara Noivas" className="h-12 w-auto" />
        <h2 className="font-display text-xl font-medium sm:text-2xl">
          VENHA SE SENTIR-SE ESPECIAL!
        </h2>
        <div className="flex gap-4 text-lg">
          <a href="https://www.instagram.com/iaranoivas/" aria-label="Instagram" className="transition-colors hover:text-accent">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/iaranoivapa?locale=pt_BR" aria-label="Facebook" className="transition-colors hover:text-accent">
            <FaFacebookF />
          </a>
          <a href="https://www.linkedin.com/in/joaopaulo26/" aria-label="LinkedIn" className="transition-colors hover:text-accent">
            <FaLinkedin />
          </a>
          <a href="https://wa.me/+5535998127656" aria-label="Whatsapp" className="transition-colors hover:text-accent">
            <FaWhatsapp />
          </a>
        </div>
        <div className="font-label text-xs uppercase tracking-wide text-bone/60">
          <span className="text-bone">Portugues</span> | <span>Brasil</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-md grid-cols-2 gap-8 py-8">
        <div>
          <h4 className="font-label text-xs uppercase tracking-wide text-bone/60">Vestidos</h4>
          <Link
            to="https://wa.me/+5535998127656"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block font-body text-sm text-bone/90 transition-colors hover:text-accent"
          >
            Solicite uma consulta
          </Link>
        </div>
        <div>
          <h4 className="font-label text-xs uppercase tracking-wide text-bone/60">Empresa</h4>
          <Link to="/about" className="mt-2 block font-body text-sm text-bone/90 transition-colors hover:text-accent">
            Sobre nós
          </Link>
          <Link to="/contact" className="mt-1 block font-body text-sm text-bone/90 transition-colors hover:text-accent">
            Contato
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 border-t border-bone/15 pt-6 text-center font-body text-xs text-bone/50">
        <p>© 2025 Iara Noivas - Vestidos de Casamento</p>
        <p>
          Made by{" "}
          <a href="https://github.com/jpars26" className="underline transition-colors hover:text-accent">
            Jpars26
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
