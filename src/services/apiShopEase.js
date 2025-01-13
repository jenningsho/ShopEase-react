import Axios from 'axios';

const apiShopEase = Axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MzY3NzkxODUsImV4cCI6MTczNjc4Mjc4NSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiamVhbi5kdXBvbnRAdGVzdC5jb20ifQ.H8G5xUC0IwaOrBaoOKdo2afbMvqQt60Ozell34sCm9mK2rcybgxNn3xgXcJCV1hzy3xe-xMIE_halxVCM4fOy94pQgsZwJV9cCPto8rJWTkLDD3X0Y_5t3AbPnljEXZWaV30-EKka6h7CUovYdzz5K7qWBG0-Op9UcyMAB6YOfqgPCtr0L4mpWmKyGgjKbl-wb5LTTnYg6DOV56AisYEScHtFOz6QtXEYeQGrsT1XIcgzJJ9VC07zZoINgyZgWhaMo7Zut-Pi7xYIAr6i49-VT8iAcZI3fE7zpIRGXtL--VhNfb85bRGykuu_ClORQVIWeuPpwX7vhbQUhjh2HNoAg";

apiShopEase.interceptors.request.use( req => {
    req.headers['Authorization'] = `Bearer ${token}`;
    return req;
})

export default apiShopEase;