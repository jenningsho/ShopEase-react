import { Link } from "react-router-dom";

const Header = () =>{

    return(

        <header className="header">
            <nav className="nav container">
                <Link to="/">Home</Link>
                <Link to="/">Panier</Link>
            </nav>

        </header>
    )
}

export default Header;

