// Récuperer le panier depuis le localstorage
export const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Sauvegarder le panier dans le localstorage
export const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Calcul de la quantité total des articles dans lepanier
export const totalQuantity = (cart) => {
    return cart.reduce( (accum, item) => accum + item.quantity,0);
}

// Ajouter un produit au panier
export const addToCart = (product, cart, setCart, setFlashMessage) => {

    // Vérifie si le produit existe dans le panier
    const existingProduct = cart.some((item) => item.id === product.id);

    if (existingProduct) {
        // Si le produit existe, on met à jour la quantité
        const updatedCart = cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        // Mise à jour du panier dans le state
        setCart(updatedCart);
        // sauvegarde le panier mis à jour
        saveCart(updatedCart);
    } else {
        // Sinon, on ajoute le produit avec une quantité de 1
        const updatedCart= [...cart, { ...product, quantity: 1}];
        setCart(updatedCart);
        saveCart(updatedCart);
    }

    // affiche un message flash
    if(setFlashMessage){
        setFlashMessage(`${product.nom} a été ajouté au panier.`);

        setTimeout(() => {
            setFlashMessage("");
        }, 3000);
    }
}

// Supprimer un produit au panier
export const removeFromCart = (product, cart, setCart, setFlashMessage) => {


    // Vérifie si le produit existe dans le panier
    // différence find et some est que some retourne un boolean et pas l'objet du produit. 
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {

        if(existingProduct.quantity > 1){
            // Si le produit existe, on met à jour la quantité
            const updatedCart = cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
            );
            // Mise à jour du panier dans le state
            setCart(updatedCart);
            // sauvegarde le panier mis à jour
            saveCart(updatedCart);
        } else if(existingProduct.quantity === 1) {
            // Sinon, supprime le produit si la quantité est à 0
            const updatedCart= cart.filter((item) => item.id !== product.id);
            setCart(updatedCart);
            saveCart(updatedCart);
        }     
        // affiche un message flash
        if(setFlashMessage){
            setFlashMessage(`${product.nom} a été suprimé au panier.`);

            setTimeout(() => {
                setFlashMessage("");
            }, 3000);
        }
    }
};