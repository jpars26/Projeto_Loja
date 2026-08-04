export const computeAvailableFilterOptions = (products) => {
  const colors = new Set();
  const models = new Set();

  products.forEach((product) => {
    if (product.color) colors.add(product.color);
    if (product.model) models.add(product.model);
  });

  return {
    colors: Array.from(colors).sort(),
    models: Array.from(models).sort(),
  };
};

export const filterProductsByAttributes = (products, { colors = [], models = [] } = {}) =>
  products.filter((product) => {
    const matchesColor = colors.length === 0 || colors.includes(product.color);
    const matchesModel = models.length === 0 || models.includes(product.model);
    return matchesColor && matchesModel;
  });

export const parseFilterParam = (value) => (value ? value.split(",").filter(Boolean) : []);
