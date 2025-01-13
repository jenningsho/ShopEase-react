import { Link } from "react-router-dom";
import "./Header.css";

const Header = () =>{

    return(

        <header className="header">
                <nav className="navbar navbar-expand-lg">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="a">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="a">Decorations</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="a">High-Tech</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="a">Sacs</Link>
                            </li>
                        </ul>
                    </div>
                <Link className="header-center">ShopEase Store</Link>
                </nav>
                <div className="header-right">
                    <form className="d-flex mx-3" role="search">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <div className="cart-class">
                        <Link to="/" className="cart-link">Panier</Link>  
                    </div>
                </div>
                
        </header>
    )
}

export default Header;

