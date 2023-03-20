export async function getCategories() {
  const data = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await data.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(search) {
  const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
  const categoriesQuery = await data.json();
  return categoriesQuery;
}

export async function getProductById(id) {
  const data = await fetch(` https://api.mercadolibre.com/items/${id}`);
  const productId = await data.json();
  return productId;
}
