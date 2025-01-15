import { useEffect, useState } from "react";
import { getCategoryList } from "../../services/categories";
import "./CategoryPicker.css";
import { Link } from "react-router-dom";

const CategoryPicker = () => {

    const [ categories, setCategories] = useState([]);
    const [ error, setError ] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // État pour contrôler l'affichage


   // Gérer l'affichage du menu au survol
    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };
    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };
    

    // Chargement des catégories avec l'API
    useEffect( () => {
        getCategoryList()
        .then( response => {
            console.log(response.data);
            setCategories(response.data.member);
        })
        .catch( err => {
            setError(err.message);
        })
    }, []);

    if(error){
        return <p>Erreur: {error}</p>;
    }
    if(categories.length === 0){
        return <p>Chargement des catégories ...</p>;
    }

    return(

        <div
            className="category-dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="dropdown-trigger fw-bolder">Catégories</div>
            {isDropdownOpen && (
                <div className="dropdown-menu">
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link to={`/categories/${category.id}`}>
                                    {category.nom}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default CategoryPicker;