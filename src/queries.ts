const BASE_URL = "https://dummyjson.com";

const getProducts = (pageParam: number) =>
  fetch(`${BASE_URL}/products?limit=10&select=id,title,price,thumbnail&skip=${pageParam}`)
    .then((res) => res.json())
    .then((data) => data.products);

const getProduct = (productId: string) =>
  fetch(
    `${BASE_URL}/products/${productId}?select=id,title,description,thumbnail,price,brand,images,category`
  ).then((res) => res.json());

const getFirstProductByCategory = (category: string) =>
  fetch(`${BASE_URL}/products/category/${category}?limit=1`)
    .then((res) => res.json())
    .then((data) => data.products[0]);

const getProductById = async (productId: string) => {
  const product = await getProduct(productId);

  if (product.message?.includes("not found")) {
    throw new Error("Product not found");
  }

  // NOTE (Francisco Miguel Peralta 2025-07-11): This is just for the sake of the example, but should
  // build a better related product logic and send the related products in the response.
  const relatedProduct = await getFirstProductByCategory(product.category);

  return { ...product, relatedProduct };
};

export const queries = {
  getProducts,
  getProductById,
};
