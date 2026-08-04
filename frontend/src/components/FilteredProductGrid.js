import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const FilteredProductGrid = ({ products, onClearFilters }) => {
  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <p className="font-body text-sm text-ink/70">Nenhum vestido encontrado com esse filtro.</p>
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-4 font-label text-xs uppercase tracking-wide text-accent underline"
        >
          Limpar filtros
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <p className="pb-2 font-label text-xs uppercase tracking-wide text-ink/50">
        {products.length} {products.length === 1 ? "vestido encontrado" : "vestidos encontrados"}
      </p>
      <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link key={product.id} to={`/collections/${product.collectionId}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilteredProductGrid;
