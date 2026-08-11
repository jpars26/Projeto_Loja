const flattenCategoryProducts = (catalog, category) =>
  catalog
    .filter((collection) => collection.category === category)
    .flatMap((collection) => collection.products);

export default flattenCategoryProducts;
