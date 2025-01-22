import React, { useState } from 'react';
import apiShopEase from '../services/apiShopEase';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await apiShopEase.post('/utilisateurs', { email, password });
            setMessage('Inscription réussie. Vous pouvez maintenant vous connecter.');
        } catch (error) {
            setMessage('Erreur lors de l’inscription.');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Inscription</h2>
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
            <button type="submit">S'inscrire</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Register;
