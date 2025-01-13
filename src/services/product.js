import apiShopEase from "./apiShopEase";

export const getProductList = () => apiShopEase.get('/produits/');
export const getProductByCategory = (categoryId) =>  apiShopEase.get(`categories/${categoryId}/products`)