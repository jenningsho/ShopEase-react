// calcul du prix total TTC
export const calculateTTC = (priceHT, taxRate = 0.2) => {
    return ( priceHT * (1 + taxRate)).toFixed(2); 
}

// calcul du prix total hors taxe
export const totalPriceWt = (cart, taxRate = 0.2) => {
    return cart.reduce( (total, product) => 
        total + calculateTTC(product.prix, taxRate) * product.quantity, 0).toFixed(2);
}