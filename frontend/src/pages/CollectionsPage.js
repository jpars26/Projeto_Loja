// src/pages/CollectionsPage.js
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CollectionGrid from "../components/CollectionGrid";
import ProductFilterBar from "../components/ProductFilterBar";
import FilteredProductGrid from "../components/FilteredProductGrid";
import CollectionsHub from "../components/CollectionsHub";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet-async";
import catalog from "../data/catalog";
import flattenCategoryProducts from "../utils/flattenCategoryProducts";
import {
  computeAvailableFilterOptions,
  filterProductsByAttributes,
  parseFilterParam,
} from "../utils/productFilters";

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

const CollectionsPage = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedColors = useMemo(() => parseFilterParam(searchParams.get("cor")), [searchParams]);
  const selectedModels = useMemo(() => parseFilterParam(searchParams.get("modelo")), [searchParams]);

  const categoryProducts = useMemo(
    () => (category ? flattenCategoryProducts(catalog, category) : []),
    [category]
  );
  const filterOptions = useMemo(() => computeAvailableFilterOptions(categoryProducts), [categoryProducts]);
  const filteredProducts = useMemo(
    () => filterProductsByAttributes(categoryProducts, { colors: selectedColors, models: selectedModels }),
    [categoryProducts, selectedColors, selectedModels]
  );

  const hasActiveFilter = selectedColors.length > 0 || selectedModels.length > 0;

  const toggleParam = (paramName, value, selectedValues) => {
    const next = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    const nextParams = new URLSearchParams(searchParams);
    if (next.length > 0) {
      nextParams.set(paramName, next.join(","));
    } else {
      nextParams.delete(paramName);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleClearFilters = () => setSearchParams({}, { replace: true });

  if (!category) {
    return (
      <Layout>
        <Helmet>
          <title>Iara Noivas | Coleções — Vestidos de Noiva, Ternos e Vestidos de Festa</title>
          <meta
            name="description"
            content="Descubra as coleções da Iara Noivas: vestidos de noiva, ternos e vestidos de festa em looks exclusivos para cada ocasião."
          />
          <meta property="og:title" content="Iara Noivas - Coleções" />
          <meta
            property="og:description"
            content="Vestidos de noiva, ternos e vestidos de festa em coleções exclusivas."
          />
          <meta property="og:url" content="https://www.iaranoivas.com/collections" />
          <meta property="og:type" content="website" />
        </Helmet>

        <CollectionsHub />
      </Layout>
    );
  }

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

      <ProductFilterBar
        colorOptions={filterOptions.colors}
        modelOptions={filterOptions.models}
        selectedColors={selectedColors}
        selectedModels={selectedModels}
        onToggleColor={(color) => toggleParam("cor", color, selectedColors)}
        onToggleModel={(model) => toggleParam("modelo", model, selectedModels)}
        onClear={handleClearFilters}
      />

      {hasActiveFilter ? (
        <FilteredProductGrid products={filteredProducts} onClearFilters={handleClearFilters} />
      ) : (
        <CollectionGrid category={category} />
      )}
    </Layout>
  );
};

export default CollectionsPage;
