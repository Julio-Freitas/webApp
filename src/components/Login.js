import React, { useState,  } from 'react';
import api from './../services/api';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login ({history}) {

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    async function handleSubmit(e) {

        e.preventDefault();
        await api.post('/login', { email, password }).then(result => {
            if (result.data.ok === 'Usuário existe') {
                logarUser()
            } else {
                setMsg('Senha ou usuário inválidos');
            }
        });

    }
    async function logarUser() {
        const response = await api.get('/login', { email, password });
        response.data.filter(function (item) {
            let verifica = (item.password === password && item.email === email);
            if (verifica) {
                history.push(`/registro/${item.id}`);
            } else {
                setMsg('Senha ou usuário inválidos'); 
            }
            return true
        });
    }
    
    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>
                <input className='customer-btn' type='email' placeholder="Digite seu email" required
                    name='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input className='customer-btn' type="password" autoComplete='' placeholder='Senha' required
                    name='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className='customer-btn' type='submit'>Entrar</button>
                <Link to='/novo'>Cadastre-se</Link>
                <div className='alert-msg'>{msg}</div>
            </form>
        </div>
    );
}
