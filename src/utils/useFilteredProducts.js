import { useState, useEffect } from "react";

/**
 * Hook pour gérer le filtrage des produits.
 * @param {Array} products - Liste initiale des produits.
 * @param {string} searchQuery - Requête de recherche.
 * @returns {Array} filteredProducts - Produits filtrés.
 */
export const useFilteredProducts = (products, searchQuery) => {
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (searchQuery && searchQuery.trim() !== "") {
            // Filtrage des produits
            const filtered = products.filter((product) =>
                product.nom.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            // Si aucune recherche, affiche tous les produits
            setFilteredProducts(products);
        }
    }, [searchQuery, products]);

    return filteredProducts;
};
