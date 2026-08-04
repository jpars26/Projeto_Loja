// src/pages/CollectionsPage.js
import { Link } from "react-router-dom";
import CollectionGrid from "../components/CollectionGrid";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet-async";

const CATEGORIES = [
  { slug: "noivas", label: "Noivas", activeBorderClass: "border-noivas" },
  { slug: "ternos", label: "Ternos", activeBorderClass: "border-ternos" },
  { slug: "festa", label: "Vestidos de Festa", activeBorderClass: "border-festa" },
];

const SEO_BY_CATEGORY = {
  noivas: {
    title: "Iara Noivas | Vestidos de Noiva - Coleções Exclusivas",
    description:
      "Descubra nossas coleções de vestidos de noiva elegantes e sofisticados para o seu grande dia.",
    ogTitle: "Iara Noivas - Coleções de Vestidos de Noiva",
    ogDescription: "Conheça nossas coleções de vestidos para noivas sofisticadas.",
  },
  ternos: {
    title: "Iara Noivas | Ternos - Coleções Exclusivas",
    description: "Descubra nossas coleções de ternos para casamentos e eventos especiais.",
    ogTitle: "Iara Noivas - Coleções de Ternos",
    ogDescription: "Conheça nossas coleções de ternos.",
  },
  festa: {
    title: "Iara Noivas | Vestidos de Festa - Coleções Exclusivas",
    description: "Descubra nossas coleções de vestidos de festa para todas as ocasiões.",
    ogTitle: "Iara Noivas - Coleções de Vestidos de Festa",
    ogDescription: "Conheça nossas coleções de vestidos de festa.",
  },
};

const CollectionsPage = ({ category = "noivas" }) => {
  const seo = SEO_BY_CATEGORY[category] ?? SEO_BY_CATEGORY.noivas;

  return (
    <Layout>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:url" content={`https://www.iaranoivas.com/collections/${category}`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <nav
        className="mx-auto flex max-w-6xl justify-center gap-6 border-b border-hairline px-4 pt-16 sm:px-6"
        aria-label="Categorias"
      >
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            to={`/collections/${cat.slug}`}
            className={`border-b-2 py-2 font-label text-xs uppercase tracking-wide transition-colors ${
              category === cat.slug
                ? `${cat.activeBorderClass} text-ink`
                : "border-transparent text-ink/70 hover:text-ink"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </nav>

      <CollectionGrid category={category} />
    </Layout>
  );
};

export default CollectionsPage;
