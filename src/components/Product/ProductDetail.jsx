import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const ProductDetail = ({ searchQuery }) => {
    
    const [ product, setProduct ] = useState([]);
    const [ lashMessage, setFlashMessage ] = useState("");
    const [ error, setError ] = useState(null);
    const dispatch = useDispatch();

    const handleAddToCart = (product) =>{
            dispatch(addToCart(product));
            setFlashMessage(`${product.nom} a été ajouté au panier`);
    }

    useEffect( () => {

        getProductDetail()
        .then( (response) => {
            console.log(response.data);
            setProduct(response.data);  
        })
        .catch((err) =>{
            setError(err.message);
            }
        )
    }, [])


    if(error){ return <div>Erreur: {error} </div> }

    return(
        <div>
            <h1>Détail du produit</h1>
        </div>
    )
}

export default ProductDetail;