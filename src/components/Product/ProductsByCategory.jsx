import { useEffect, useState } from "react"
import { getProductsByCategory } from "../../services/product";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../constants/config";
import { truncateText } from "../../utils/truncateText";
import { calculateTTC } from "../../utils/price";
import "./ProductsByCategory.css"

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductsByCategory = () => {
    const { id } = useParams(); // recupere id de la catégorie depuis l'url
    const[ products, setProducts] = useState([]);
    const[ error, setError] = useState(null);
    
    const [ cart, setCart ] = useState([]);
    const [ flashMessage, setFlashmessage] = useState("");
    const [ loading, setLoading ] = useState(true);


    // Fonction pour ajouter un produit au panier
    const addToCart = (product) => {

        // Vérifie si le produit existe déja dans le panier
        const existingProduct = cart.some( (item) => item.id === product.id);

        if(existingProduct) {
            // si le produit existe, on met à jour la quantité
            const updatedCart = cart.map( (item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item );

            setCart(updatedCart); // met à jour le panier 
        } else {
            // sinon on ajoute le produit avec une quantité à 1
            setCart( [...cart, {...product, quantity: 1}]);
        }
        
        setFlashmessage(` ${product.nom} a été ajouté au panier.`);

        setTimeout( () => {
            setFlashmessage("");
        }, 3000)
    };

    // on charge le panier depuis le localstorage
    useEffect( () => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, [] );

     // on met a jour le localstorage quand le panier change
    useEffect( () => {
        if(cart.length > 0 ){
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    // Récupere les liens des produits associé avec l'id de la catégorie
    useEffect( () => {
        getProductsByCategory(id)
            .then( (response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch( (err) => {
                setError(err.message) 
                setLoading(false);
            })
    }, [id])


    if(error){
        return <div>Erreur: {error}</div>;
    }



    return(
        <div className="products-by-category-container">
            {flashMessage && <div className="flash-message">{flashMessage}</div>}

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
            products.map( (product) => (
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
                            onClick={() => addToCart(product)}>Ajouter au panier</button>
                            </p>
                </div>
            ))}
            </div>
        </div>
    )
}

export default ProductsByCategory;