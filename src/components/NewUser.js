import React, { useState } from 'react';

import api from '../services/api';



import './Login.css';

export default function NewUser({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await api.get('/login', { email, password });

        if (response.data.length <= 0) {
            create();
            history.push('/');

        } else if (response.data.length > 0) {

            let teste = response.data.filter(function (item) {
                return (item.email === email);
            });
            if (teste.length > 0) {
                setMsg('Usuário Já existe');
            } else{
                create();
                history.push('/');
            }
        }
    }

    async function create() {
        await api.post('/cadastro', { email, password });
    }
        

        return (
            <div className='login'>
                <form onSubmit={handleSubmit}>
                    <h3>Cadastre-se</h3>
                    <input className='customer-btn' type='email' placeholder="Digite seu email" required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input className='customer-btn' type='text' placeholder='Senha' required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className='customer-btn' type='submit'>Entrar</button>

                    <div className='alert-msg'>{msg}</div>
                </form>
            </div>
        );
    }
