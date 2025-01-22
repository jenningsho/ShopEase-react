import { useEffect, useState } from "react";
import { WITH_API_BASE_URL } from "../../constants/config";
import { getCommandeByUser } from "../../services/validerCommande";

const Order = () => {
    const userId = 1;
    const [commandes, setCommandes ] = useState([]);
    const [error, setError] = useState(null);

    useEffect( () => {
        const fetchCommandes = async () => {
            try{
                const response = await WITH_API_BASE_URL.getCommandeByUser(userId);
                setCommandes(response);
            } catch(error){
                setError('error lors ed la récupération des commandes;');
            }
        };

        fetchCommandes();
    }, [userId]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Mes commandes</h2>
            {commandes.length === 0 ? (
                <p>Aucune commande trouvée.</p>
            ) : (
                commandes.map((commande) => (
                    <div key={commande.id}>
                        <h3>Commande #{commande.id}</h3>
                        <p>Statut : {commande.statut}</p>
                        <p>Date : {commande.created_at}</p>
                        <ul>
                            {commande.produits.map((produit) => (
                                <li key={produit.id}>
                                    {produit.nom} - Quantité : {produit.quantite} - Prix unitaire : {produit.prix_unitaire} €
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}

export default Order;