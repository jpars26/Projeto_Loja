import { useParams } from "react-router-dom";
import CollectionsPage from "./CollectionsPage";
import CollectionId from "./CollectionId";

// Categorias conhecidas do catálogo (ver data/catalog/*.js). Ids de coleção
// nunca usam esses literais como valor, então checar a categoria primeiro
// desambigua de forma determinística /collections/:slug entre categoria e
// id de coleção, sem depender de ordem/especificidade de rotas do React
// Router (que não faz fallback entre rotas irmãs de mesmo formato).
const KNOWN_CATEGORIES = ["noivas", "ternos", "festa"];

const CollectionSlugRouter = () => {
  const { slug } = useParams();

  if (KNOWN_CATEGORIES.includes(slug)) {
    return <CollectionsPage category={slug} />;
  }

  return <CollectionId />;
};

export default CollectionSlugRouter;
