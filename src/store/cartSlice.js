import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice( {
    name: 'cart',
    initialState: {
        items: [],
    },
    // reducer est défini par : nom de fonction , fonction fléchée et des propriétés de fonctions : slice et action
    reducers: {
        // state : le state actuel du slice
        // action : contenant une variable payload qui est la valeur récupérée lorsqu'on utilise
        addToCart: ( state, action) => {
            const product = action.payload;

            // Vérifie si le produit existe déja dans le panier
            const existingProduct = state.items.find( (item) => item.id === product.id);

            if(existingProduct) {
                // Si il existe, on met à jour la quantité
                existingProduct.quantity += 1;
            } else {
                // Sinon , on ajoute produit avec quantité 1
                state.items.push( {...product, quantity: 1});
            }
        },

        removeFromCart: ( state, action ) => {
            const product = action.payload;

            // Vérifie si le produit existe déja dans le panier
            const existingProduct = state.items.find( (item) => item.id === product.id);

            if(existingProduct) {
                // si quantité > 1, on décrémente de 1
                if(existingProduct.quantity > 1) {
                    existingProduct.quantity -= 1;
                } else {
                    // Sinon, on le retire du panier
                    state.items = state.items.filter( (item) => item.id !== product.id);   
                }
            }
        },
        clearCart: ( state) => {
            state.items = [];
        }
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;