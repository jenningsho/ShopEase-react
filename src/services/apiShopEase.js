import Axios from 'axios';

const apiShopEase = Axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})



apiShopEase.interceptors.request.use( req => {

    // ajout du token si la route n'est pas publique
    if(!req.url.includes('/produits') && !req.url.includes('/categories')){
        const token = localStorage.getItem('token');

        req.headers['Authorization'] = `Bearer ${token}`;
    }
    return req;
})

export default apiShopEase;