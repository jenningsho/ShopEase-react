import { useEffect, useState } from "react"
import { getProductsByCategory } from "../../services/product";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../constants/config";
import { truncateText } from "../../utils/truncateText";
import { calculateTTC } from "../../utils/price";


const ProductsByCategory = () => {
    const[ products, setProducts] = useState([]);
    const[ error, setError] = useState(null);
    const [ cart, setCart ] = useState([]);
    const [ flashMessage, setFlashmessage] = useState("");

    const { id } = useParams();

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

    useEffect( () => {
        getProductsByCategory(id)
            .then( response => {
                console.log("Api reponse: ",response.data);
                setProducts(response.data.member);
            })
            .catch( err => {
                setError(err.message);
            })
        }, [id]);

    if(error){
        return <div>Erreur: {error}</div>;
    }
    if(!products ||products.length === 0){
        return <p>Aucun produit trouvé pour cette catégorie.</p>;
    }


    return(
        <div className="products-by-category-container">
            {flashMessage && <div className="flash-message">{flashMessage}</div>}

            <h1 className="text-center my-3">Produits du moment</h1>
            <div className="products-list">

                {products.map( (product) => (
                    <div key={product.id} className="card">
                        <Link to={`produits/${product.id}`}>
                        <img src={`${API_BASE_URL}/uploads/${product.image}`} alt={product.nom}  className="product-image"/>
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