import apiShopEase from "./apiShopEase";

export const getCategoryList = () => apiShopEase.get('/categories');