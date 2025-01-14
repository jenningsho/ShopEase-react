import { Link } from "react-router-dom";
import "./Header.css";
import CategoryPicker from "../CategoryPicker/CategoryPicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Header = () =>{
    const [cart, setCart] = useState([]);

    // on charge le panier depuis le localstorage
    useEffect( () => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, [] );

    const totalQuantity = cart.reduce( (accum, item) => accum + item.quantity,0);


    return(

        <div className="header">
                <nav className="navbar navbar-expand-lg">
                    <div className="collapse navbar-collapse">
                        <CategoryPicker/>
                    </div>
                <Link to="/" className="header-center">ShopEase Store</Link>
                </nav>
                <div className="header-right">
                    <form className="d-flex mx-3" role="search">
                        <input className="form-control" type="search" placeholder="Tapez un nom de produit, catégorie, ..." aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <div className="shopping-cart">
                        <Link to="/cart" className="cart-link ">
                        <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                                <span className="badge fw-bolder text-black">{totalQuantity}</span>
                        </Link>  
                    </div>
                </div>
        </div>
    )
}
export default Header;

