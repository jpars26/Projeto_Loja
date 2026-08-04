const flattenCategoryProducts = (catalog, category) =>
  catalog
    .filter((collection) => collection.category === category)
    .flatMap((collection) =>
      collection.products.map((product) => ({
        ...product,
        collectionId: collection.id,
        collectionName: collection.name,
      }))
    );

export default flattenCategoryProducts;
