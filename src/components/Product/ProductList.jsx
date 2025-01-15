import { useEffect, useState } from "react";
import { getProductList } from "../../services/product";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { calculateTTC } from "../../utils/price";
import { truncateText } from "../../utils/truncateText";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Composant ProductList
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [flashMessage, setFlashMessage] = useState("");
    const [loading, setLoading] = useState(true); // Correctement défini en minuscule

    // Fonction pour ajouter un produit au panier
    const addToCart = (product) => {
        // Vérifie si le produit existe déjà dans le panier
        const existingProduct = cart.some((item) => item.id === product.id);

        if (existingProduct) {
            // Si le produit existe, on met à jour la quantité
            const updatedCart = cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCart(updatedCart);
        } else {
            // Sinon, on ajoute le produit avec une quantité de 1
            setCart([...cart, { ...product, quantity: 1 }]);
        }

        setFlashMessage(`${product.nom} a été ajouté au panier.`);

        setTimeout(() => {
            setFlashMessage("");
        }, 3000);
    };

    // On charge le panier depuis le localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    // On met à jour le localStorage quand le panier change
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    // Récupération des produits depuis l'API
    useEffect(() => {
        getProductList()
            .then((response) => {
                console.log(response.data);
                setProducts(response.data.member); // Stocke les produits dans le useState
                setLoading(false); // Désactive le chargement
            })
            .catch((err) => {
                setError(err.message); // Stocke les erreurs
                setLoading(false); // Désactive le chargement même en cas d'erreur
            });
    }, []);

    if (error) {
        return <div>Erreur: {error}</div>;
    }

    const baseURL = "http://127.0.0.1:8000"; // URL de ton backend

    return (
        <div className="productList-container">
            {flashMessage && <div className="flash-message">{flashMessage}</div>}

            <h1 className="text-center my-3">Produits du moment</h1>
            <div className="products-list">
                {loading
                    ? // Skeleton pendant le chargement
                        Array(6)
                            .fill(null)
                            .map((_, index) => (
                                <div key={index} className="card placeholder-card">
                                    <Skeleton height={200} width="100%" />
                                    <div className="contentBox">
                                        <Skeleton height={20} width="80%" />
                                        <Skeleton height={20} width="60%" />
                                        <Skeleton height={40} width="50%" />
                                    </div>
                                </div>
                            ))
                        : // Affichage des produits une fois chargés
                        products.map((product) => (
                            <div key={product.id} className="card">
                                <Link to={`produits/${product.id}`}>
                                    <img
                                        src={`${baseURL}/uploads/${product.image}`}
                                        alt={product.nom}
                                        className="product-image"
                                        loading="lazy"
                                    />
                                </Link>
                                <div className="contentBox">
                                    <h1 className="product-name fs-5">{truncateText(product.nom, 40)}</h1>
                                    <p className="fw-bolder">Prix TTC : {calculateTTC(product.prix)} €</p>
                                </div>
                                <p>
                                    <button className="addToCart" onClick={() => addToCart(product)}>
                                        Ajouter au panier
                                    </button>
                                </p>
                            </div>
                        ))}
            </div>
        </div>
    );
};

export default ProductList;
