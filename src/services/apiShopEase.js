import Axios from 'axios';

const apiShopEase = Axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MzY3ODI5NTMsImV4cCI6MTczNjc4NjU1Mywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiamVhbi5kdXBvbnRAdGVzdC5jb20ifQ.hk5AjJw2grlDJSOr8CZGxdC2oLIx2MGfUaPjZ37PYW3jHepZf-hMpRJukcadmu2wZvBCOamOpiP4-pUAIZpz6A8woOBXlwYphwOOHS_6V_tRvO3nraREn5R22O9ovkUD6f_mSMcJrwjePYFaLwWcQooKWhkzGYAa2zpGa6DI57rC0DJMR9e6ODjRb2Ai0w82EOm1hv15_BONMBiQOSAqg2qkMjYs7qdTsnim3ccfEmsDnIQT8xh_tLkMoC5Wc6yAcAnFpwNyc6usnuyyklUi09-NJibT2Ndkgv-LqJAixQ9dVT6a-krbwIxBNSSDTT09xW-9uo5fVpCgZW_gbLOJRw";

apiShopEase.interceptors.request.use( req => {
    req.headers['Authorization'] = `Bearer ${token}`;
    return req;
})

export default apiShopEase;