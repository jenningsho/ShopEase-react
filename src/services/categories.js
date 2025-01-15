import apiShopEase from "./apiShopEase";

/**
 * Récupere toutes les catégories
 * @returns 
 */
export const getCategoryList = () => apiShopEase.get('/categories');