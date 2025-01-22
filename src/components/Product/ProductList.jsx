import { useEffect, useState } from "react";

// Import de l'api pour récuperer tout les produits
import { getProductList } from "../../services/product";
import { Link } from "react-router-dom";

// Import du style du composant ProductList
import "./ProductList.css";

// Import d'une configuration pour l'url de base
import { API_BASE_URL } from "../../constants/config";

// Import fonctions de calcul et tronquage , getCart
import { calculateTTC } from "../../utils/price";
import { truncateText } from "../../utils/truncateText";
import { useFilteredProducts} from "../../utils/useFilteredProducts";

// import du placeholder loading content
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css";

// Import Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import FlashMessage from "../FlashMessage/FlashMessage";


const ProductList = ( {searchQuery}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [flashMessage, setFlashMessage ] = useState("");

    // Hook useDispatch 
    const dispatch = useDispatch();

    const handleAddToCart = (product) =>{
        dispatch(addToCart(product));
        setFlashMessage(`${product.nom} a été ajouté au panier`);
    }

    // Récupération des produits depuis l'API
    useEffect( () => {
        getProductList()
        .then((response) => {
            console.log(response.data);
            setProducts(response.data.member); // Stocke les produits dans le useState
            setLoading(false); // Désactive le chargement
        })
        .catch((err) => {
            setError(err.message); // Stocke les erreurs
            setLoading(false); 
        });
    }, []);

    // hook pour filtrer les produits
    const filteredProducts = useFilteredProducts(products, searchQuery);


    if (error) {
        return <div>Erreur: {error}</div>;
    }


    return (
        <div className="productList-container">
            <FlashMessage
                message = {flashMessage}
                duration= { 2000}
                onClose = { () => setFlashMessage()}/>
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
                        filteredProducts.map((product) => (
                            <div key={product.id} className="card">
                                <Link to={`produits/${product.id}`}>
                                    <img
                                        src={`${API_BASE_URL}/uploads/${product.image}`}
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
                                    <button className="addToCart" onClick={() => handleAddToCart(product)}>
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
