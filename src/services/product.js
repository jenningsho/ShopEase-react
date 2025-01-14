import apiShopEase from "./apiShopEase";


/**
 * 
 * Récupere la liste des tous les produits
 */
export const getProductList = () => apiShopEase.get('/produits/');


/**
 * 
 * @param {number} categoryId Id de la catégorie
 * @returns 
 */
export const getProductsByCategory = (categoryId) =>  apiShopEase.get(`categories/${categoryId}`)

