import Axios from 'axios';

const apiShopEase = Axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})



apiShopEase.interceptors.request.use( req => {

    // ajout du token si la route n'est pas publique
    if(!req.url.includes('/produits') && !req.url.includes('/categories')){
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MzY4NTIyMDksImV4cCI6MTczNjg1NTgwOSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiamVhbi5kdXBvbnRAdGVzdC5jb20ifQ.U4obcUGJQZeg3QybnulpAuoyMNWM9ns7UyXZFFaArNmxgJlTjbpi51UMdj56gf87v0YGVh2-OfDbnrlShdlQlc0cv_LDQHfuuDAVGXDW9YegIJRQ4j8z2MD2dr6YlJZYYAaZ-2SYqiz-abix6v8qRwacBDyZslWmr1zpU4cx3fEc_5K_9oIgLyDnJM7JTFt0HtF_C2y0MpbJQyFpyXGIJ2fvGSciQtLGj-M4ESL4FUGqqnmtiIpeMmf3XONShzCNZZEozJlEW5oBdsJvq9aY0d9k-848n6DpDrp88RWP-8RVwfehFTaP1a8bxseGZLhoep_zyRZTFZPw-sf73mBEBQ";

        req.headers['Authorization'] = `Bearer ${token}`;
    }
    return req;
})

export default apiShopEase;