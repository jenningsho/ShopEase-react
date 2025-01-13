import { useEffect, useState } from "react"
import { getProductList } from "../../services/product";
import { Link} from "react-router-dom";
import "./ProductList.css";
import { calculateTTC } from "../../utils/price";
import { truncateText } from "../../utils/truncateText";

const ProductList = () => {
    const [ products, setProducts] = useState([]);
    const [ error, setError] = useState(null);
    const [ cart, setCart ] = useState([]);

    const addToCart = (product) => {

        // Vérifie si le produit existe dans le panier
        const existingProduct = cart.some( (item) => item.id === product.id);

        if(existingProduct) {
            // si le produit existe, on met à jour la quantité
            const updatedCart = cart.map( (item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item );

            setCart(updatedCart);
        } else {
            // sinon on ajoute le produit avec une quantité à 1
            setCart( [...cart, {...product, quantity: 1}]);
        }
    };

     // on charge le panier depuis le localstorage
    useEffect( () => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, [] );

    // on met à jour le localstorage quand le panier change
    useEffect( () => {
        if(cart.length > 0 ){
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);



    useEffect( () => {
        getProductList()
        .then( response => {
            console.log(response.data);
            setProducts(response.data.member); // on stock les produits dans le useState
        })
        .catch( err => {
            setError(err.message); // on stock les erreurs dans setError
        })
    }, []);

    if(error){
        return <div>Erreur: {error}</div>;
    }
    if(!products ||products.length === 0){
        return <p>Chargement du contenu ...</p>;
    }

    const baseURL = "http://127.0.0.1:8000"; // URL de ton backend


    return(
        <div className="productList-container">
            <h1>Produits du moment</h1>
            <div className="products-list">

                {products.map( (product) => (

                    <div key={product.id} className="card">
                        <Link to={`produits/${product.id}`}>
                        <img src={`${baseURL}/uploads/${product.image}`} alt={product.nom}  className="product-image"/>
                        </Link>
                        <div className="contentBox">
                            <h1 className="product-name fs-5">{truncateText(product.nom, 40)}</h1>
                        <p className="fw-bolder">Prix TTC : {calculateTTC(product.prix)} €</p>

                        </div>
                        {/* <p 
                            className="product-description" 
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        /> */}
                        <p><button 
                                className="addToCart" 
                                onClick={() => addToCart(product)}>Ajouter au panier</button></p>
                    </div>

                            
                    



                ))}


            </div>
        </div>
    )

}

export default ProductList;