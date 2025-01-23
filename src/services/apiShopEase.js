import Axios from 'axios';

// Instance Axios
const apiShopEase = Axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})


// Intercepte les réponse pour gérer les erreurs
apiShopEase.interceptors.request.use( 
    // passe les réponse avec succes
    function(response){
        return response
    },
    function(error) {
        // Traitement des erreurs
        if(error.response) {
            // retourne les erreurs HTTPS par le serveur
            const status = error.response.data;

            switch(status) {
                case 400 : error.response.data.erreur = "Requete invalide.Vérifier vos données.";
                case 401 : error.response.data.erreur = "Vous devez etre authentifié.";
                case 403 : error.response.data.erreur = "Accès interdit.";
                case 404 : error.response.data.erreur = "La ressource demandée est introuvable.";
                case 500 : error.response.data.erreur = "Erreur interne du serveur";
                default  : error.response.data.erreur = "Une erreur inattendue est survenue.";
            }

        } else {
            // erreur reseau
            error.response ={
                data: {
                    erreur : "Impossible de contacter le serveur.Vérifier votre connexion."
                }
            }
            console.log((error.response));
            
        }
        return Promise.reject(error);
    }
)

export default apiShopEase;