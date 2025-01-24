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


// recherche de produits par mot clé
export const searchProducts = (query) => {
    return apiShopEase.get(`search/product?query=${query}`)
};

// recupere les détails d'un produit
export const getProductDetail = (produitId) => {
    return apiShopEase.get(`produits/${produitId}`)
};