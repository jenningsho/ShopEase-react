import apiShopEase from "./apiShopEase";

/**
 * 
 * Récupere la liste des tous les produits
 */
export const getProductList = () => apiShopEase.get('/produits/');


/**
 * Normaliser l'url produit pour éviter la duplication du préfixe `api/`
 * @param {string} link - Lien relatif du produit
 * @returns {string} - URL complète
 */
const normalizeProductLink = (link) => {
    const baseURL = apiShopEase.defaults.baseURL; // Récupère la base URL configurée
    // si le lien commence par /api , on supprime ce préfixe supplémentaire
    if (link.startsWith("/api/")) {
        return `${baseURL}${link.replace(/^\/api/, "")}`; 
    }
    // sinon on combine l'url avec le lien
    return `${baseURL}${link}`;
};

/**
 * Récupère les produits d'une catégorie
 * @param {number} categoryId - ID de la catégorie
 * @returns {Promise<Array>} - Produits de la catégorie
 */
export const getProductsByCategory = async (categoryId) => { // retourne une promesse
    try {
        // Requête pour récupérer les détails de la catégorie
        const categoryResponse = await apiShopEase.get(`/categories/${categoryId}`);
        const productLinks = categoryResponse.data.produits; // Liens relatifs des produits

        // Normalise les liens pour construire les URLs complètes ( exemple : /api/produits/1 -> http://127.0.0.1:8000/api/produits/1)
        const productURLs = productLinks.map((link) => normalizeProductLink(link));

        // Requêtes pour récupérer les détails des produits
        // Promise.all fait toutes les requetes (/api/produits/1 , /apit/produits/2 etc ) , permet de gagner du temps au lieu de le faire en sequentiel
        const productDetails = await Promise.all(
            // parcours chaque url des produits 
            productURLs.map((url) => apiShopEase.get(url))
        );

        // Retourne les produits détaillés
        return productDetails.map((response) => response.data);
    } catch (error) {
        throw new Error(error.message);
    }
};