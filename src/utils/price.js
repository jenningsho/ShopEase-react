export const calculateTTC = (priceHT, taxRate = 0.2) => {
    return ( priceHT * (1 + taxRate)).toFixed(2); 
}