import { useMemo, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import collections from "../data/catalog";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard";
import ProductFilterBar from "../components/ProductFilterBar";
import FilteredProductGrid from "../components/FilteredProductGrid";
import {
  computeAvailableFilterOptions,
  filterProductsByAttributes,
  parseFilterParam,
} from "../utils/productFilters";
import { useParallax } from "../hooks/useParallax";
import logo from "../assets/images/loguinho.webp";

const Collection_ID = () => {
  const { slug: id } = useParams();
  const collection = collections.find((col) => col.id === id);
  const gridRef = useRef(null);
  const bannerParallaxRef = useParallax({ distance: 40 });
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedColors = useMemo(() => parseFilterParam(searchParams.get("cor")), [searchParams]);
  const selectedModels = useMemo(() => parseFilterParam(searchParams.get("modelo")), [searchParams]);
  const hasActiveFilter = selectedColors.length > 0 || selectedModels.length > 0;

  const collectionProducts = collection?.products ?? [];
  const filterOptions = useMemo(
    () => computeAvailableFilterOptions(collectionProducts),
    [collectionProducts]
  );
  const filteredProducts = useMemo(
    () => filterProductsByAttributes(collectionProducts, { colors: selectedColors, models: selectedModels }),
    [collectionProducts, selectedColors, selectedModels]
  );

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

  if (!collection) {
    return <h2 className="p-10 text-center font-display text-2xl text-ink">Coleção não encontrada!</h2>;
  }

  return (
    <Layout title={collection.name}>
      <Helmet>
        <title>Iara Noivas - Vestidos de Noiva </title>
      </Helmet>

      <div className="mx-auto max-w-6xl px-4 pt-8 text-center sm:px-6">
        <h1 className="sr-only">{collection.name}</h1>
        <img
          ref={bannerParallaxRef}
          src={logo}
          loading="lazy"
          alt={collection.name}
          className="mx-auto max-h-45 w-1/2 object-contain"
        />
        <p className="mt-4 font-body text-sm text-ink/70 sm:text-base">
          Explore nossa coleção exclusiva {collection.name}.
        </p>
      </div>

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
        <div
          ref={gridRef}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3"
        >
          {collection.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Collection_ID;
