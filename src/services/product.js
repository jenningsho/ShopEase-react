import apiShopEase from "./apiShopEase";

/**
 * 
 * Récupere la liste des tous les produits
 */
export const getProductList = () => apiShopEase.get('/produits/');


/**
 * Récuperer les produits d'une catégorie spécifique
 * @param {number} categoryId - Id de la catégorie
 * @returns {Promise}
 */
export const getProductsByCategory = ( categoryId ) => apiShopEase.get(`/produits/by-categorie/${categoryId}`);