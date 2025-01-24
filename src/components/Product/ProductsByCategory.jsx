import { useEffect, useState } from "react"

// Import de l'api pour récuperer tout les produits
import { getProductsByCategory } from "../../services/product";


import { Link, useParams } from "react-router-dom";

// Import du style du composant ProductsByCategory
import "./ProductsByCategory.css"

// Import d'une configuration pour l'url de base
import { API_BASE_URL } from "../../constants/config";

// Import fonctions de calcul et tronquage , getCart
import { truncateText } from "../../utils/truncateText";
import { calculateTTC } from "../../utils/price";
import { useFilteredProducts} from "../../utils/useFilteredProducts";

// import du placeholder loading content
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import FlashMessage from "../FlashMessage/FlashMessage";
import ErrorHandle from "../ErrorHandle/ErrorHandle";



const ProductsByCategory = ( {searchQuery}) => {
    const { id } = useParams(); // recupere id de la catégorie depuis l'url
    const[ products, setProducts] = useState([]);
    const[ error, setError] = useState(null);
    const [ loading, setLoading ] = useState(true); // etat local loading pour les lazy loading content
    const [ flashMessage, setFlashMessage] = useState("");

    const dispatch = useDispatch();

    const handleAddToCart = (product) =>{
        dispatch(addToCart(product));
        setFlashMessage(`${product.nom} a été ajouté au panier`);
    }

    // Récupere les liens des produits associé avec l'id de la catégorie
    useEffect( () => {
        getProductsByCategory(id)
            .then( (response) => {
                setProducts(response.data); // met a jour les produits
                setLoading(false); // arrete le chargement
            })
            .catch( (err) => {
                setError(err.response?.data?.error || 'Une erreur inconnue est survenue') // stock les erreurs
                setLoading(false);
            })
    }, [id])

    // Filtre les produits en fonction de la recherche
    const filteredProducts = useFilteredProducts(products, searchQuery);

    if(error){
        return <ErrorHandle message={error}/>;
    }

    return(
        <div className="products-by-category-container">
            <FlashMessage
                message = {flashMessage}
                duration= { 2000}
                onClose = { () => setFlashMessage()}/>
            <h1 className="text-center my-3">Produit de la catégorie</h1>
            <div className="products-by-category-list">
            { loading ? (
                Array(6)
                    .fill(null)
                    .map( (_, index) => (
                        <div key={index} className="card placeholder-card">
                            <Skeleton height={200} width="100%"/>
                            <div className="contentBox">
                                <Skeleton height={20} width="80%" />
                                <Skeleton height={20} width="60%" />
                                <Skeleton height={40} width="50%" />
                            </div>
                        </div>
                    ))
            ) : 
            filteredProducts.map( (product) => (
                <div key={product.id} className="card">
                    <Link to={`produits/${product.id}`}>
                    <img src={`${API_BASE_URL}/uploads/${product.image}`} alt={product.nom}  className="product-image" loading="lazy"/>
                    </Link>
                    <div className="contentBox">
                        <h1 className="product-name fs-5">{truncateText(product.nom, 40)}</h1>
                    <p className="fw-bolder">Prix TTC : {calculateTTC(product.prix)} €</p>

                    </div>
                    <p><button 
                            className="addToCart" 
                            onClick={() => handleAddToCart(product)}>Ajouter au panier</button>
                            </p>
                </div>
            ))}
            </div>
        </div>
    )
}

export default ProductsByCategory;