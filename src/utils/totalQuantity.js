// Calcul de la quantité total des articles dans le panier
export const totalQuantity = (cart) => {
    return cart.reduce( (accum, item) => accum + item.quantity,0);
}
