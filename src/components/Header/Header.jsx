import { Link } from "react-router-dom";
import "./Header.css";
import CategoryPicker from "../CategoryPicker/CategoryPicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getCart, totalQuantity } from "../../utils/cart";
import SearchBar from "../SearchBar/SearchBar";

const Header = ( {onSearch} ) =>{
    const [cart, setCart] = useState([]);

    // on charge le panier depuis le localstorage
    useEffect( () => {
        const storedCart = getCart();
        setCart(storedCart);
    }, [] );

    return(

        <div className="header">
                <nav className="navbar navbar-expand-lg">
                    <Link to="/" className="header-center">ShopEase Store</Link>
                    {/* Menu deroulant */}
                    <CategoryPicker/>
                </nav>
                {/* Barre de recherche */}
                <div className="header-center">
                    <SearchBar onSearch={onSearch}/>
                </div>
                {/* Panier */}
                <div className="header-right shopping-cart">
                    <Link to="/cart" className="cart-link ">
                    <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                            <span className="badge fw-bolder text-black">{totalQuantity(cart)}</span>
                    </Link>  
                </div>
        </div>
    )
}
export default Header;

