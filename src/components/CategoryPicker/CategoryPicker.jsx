import { useEffect, useState } from "react";
import { getCategoryList } from "../../services/categories";
import "./CategoryPicker.css";
import { Link } from "react-router-dom";


import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const CategoryPicker = () => {

    const [ categories, setCategories] = useState([]);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading] = useState(true);

    // Chargement des catégories avec l'API
    useEffect( () => {
        getCategoryList()
        .then( response => {
            console.log("Response de l'api:" , response.data);
            setCategories(response.data.member);
            setLoading(false);
        })
        .catch( err => {
            setError(err.message);
            setLoading(false);
        })
    }, []);

    if(error){
        return <p>Erreur: {error}</p>;
    }


    return(

        <div className="category-dropdown">
            <div className="dropdown-trigger fw-bolder">Catégories</div>
                <div className="dropdown-menu">
                    { loading ? (
                        <ul>
                            {Array(5)
                                .fill(null)
                                .map( (_, index) => (
                                    <li key={index}>
                                        <Skeleton height={20} width={150}/>
                                    </li>
                                ))}
                        </ul>
                    ): (
                        <ul>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link to={`/categories/${category.id}`}>
                                    {category.nom}
                                </Link>
                            </li>
                        ))}
                        </ul>
                    )}
                </div>
        </div>
    )
}

export default CategoryPicker;