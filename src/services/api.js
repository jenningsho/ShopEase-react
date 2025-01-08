import Axios from 'axios';

const apiShopEase = Axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})
export default apiShopEase;

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MzYzNDcxODUsImV4cCI6MTczNjM1MDc4NSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiamVhbi5kdXBvbnRAdGVzdC5jb20ifQ.FY6KjJh5IwvXum9ihlsnMBWZER0VeMTBa-s4LRBXF7qfFVRY4uY2ou99dm37nAzNeAw7fpSA4_gbcFDnG9tOa6fLFANLDkGB4IspkfG7AsSXPmEzNfy0QcqZmALlQNSjq9yRJRW4stlO5DDmWleAIwk50WyvMtK7JuiOZiVTdsA8kSW_EahecZraZ86IeoNQ6FYtiOaAqyFHOuWOfDsl_AN_Jx9YT3aLF7QKwdOFQqasM6JUcBH0dNlR_dVNniufSLS6j5Sqo9KEEbzwUrTfKGPG7xtp1beAbzOh6R0VB9bvTltCQ6Vej05bQbOX71WAb0jJv8dVH9WifzS_-06Hpg";

apiShopEase.interceptors.request.use( req => {
    req.headers['Authorization'] = `Bearer ${token}`;
    return req;
})