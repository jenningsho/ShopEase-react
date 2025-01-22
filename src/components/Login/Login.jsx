import React, { useState } from 'react';
import apiShopEase from '../services/apiShopEase';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await apiShopEase.post('/login_check', { username: email, password });
            const token = response.data.token;

            // Stocker le token dans localStorage
            localStorage.setItem('token', token);

            // Passer l'état utilisateur au parent
            onLogin(token);
        } catch (error) {
            setError('Erreur de connexion. Vérifiez vos identifiants.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Connexion</h2>
            <label>Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label>Mot de passe</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Se connecter</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Login;
