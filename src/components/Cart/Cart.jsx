import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/config";
import "./Cart.css";
import { calculateTTC, totalPriceWt } from "../../utils/price";
import { Link} from "react-router-dom";


const Cart = () => {
    const[cart, setCart ] = useState([]);
    
    
    useEffect( () => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) ||[];
        setCart(storedCart);
    }, []);

    if(cart.length === 0) return <div className="text-center text-white fs-2">
        Votre panier est vide.
    </div>;


    return(
            <div className="cart-product-list">
                <div className="row-cart">
                    <h1>Mon panier</h1>
                    <div className="price-info">
                        Prix
                    </div>
                </div>
                {cart.map( (product) => (
                    <div key={product.id} className="cart-product-content p-5">
                        <div className="cart-product-info">
                            <img src={`${API_BASE_URL}/uploads/${product.image}`} alt={product.nom} className="cart-product-image"/>
                            <div className="cart-product-description">
                                <span className="fw-bolder fs-3">{product.nom}</span>
                                <p 
                                    dangerouslySetInnerHTML={{ __html: product.description}}>
                                </p>
                            </div>
                        </div>
                            <span className="price-span fw-bolder fs-5">{calculateTTC(product.prix)}€</span>
                    </div>
                    ))}
                    {cart.map( (product) => (
                        <div key={product.id} className="totalPrice-content fs-5 ">
                            Sous total :
                            <span className="fw-bolder"> { totalPriceWt(cart)} €</span>
                                <Link to="" className="LinkTo">Passer la commande</Link>
                        </div>
                    ))}
            </div>
    )
}

export default Cart;