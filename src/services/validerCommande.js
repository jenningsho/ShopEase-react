import apiShopEase from "./apiShopEase";


export const validerCommande = (commande)=> 
    apiShopEase.post('/commandes', commande);



export const getCommandeByUser = async (userId) => {
    return apiShopEase.get(`/commandes?utilisateur=${userId}`);
};

