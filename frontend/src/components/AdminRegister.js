import React, { useState, useEffect } from 'react';
import api from './../services/api';
import './admin.css';

export default function AdminRegister({match}) {


    const [userData, SetaUserData] = useState([]);
    const [entrada, setEntrada] = useState('');
    const [saidaAlmoco, setAlmoco] = useState('');
    const [retornoAlmoco, setRetorno] = useState('');
    const [saida, setSaida] = useState('');
    const [data] = useState(new Date().toLocaleDateString());
    

    useEffect(() => {
        api.get('/').then(response => {
            const user = response.data.filter((item) => {
                return (item.userID === parseInt(match.params.id));
            });
            SetaUserData(user);
        }); 
    }, [match.params.id]);

    async function handleRegister(e) {
        e.preventDefault(); 
        await api.post('/registro', {
            entrada,
            saidaAlmoco,
            retornoAlmoco,
            saida,
            data,
            userID:parseInt(match.params.id)
        }).then(results=>{

            if(results.data === 'nOk'){
                document.querySelector('#msg-alert').innerHTML = `Você já possui um registro nesta data!`;
            }else{
                window.location.reload();
            };
                           
        }).catch(err=>{
            console.log(err)
        });

    }


    const renderList = (item) => {
        const { entrada, saidaAlmoco, retornoAlmoco, saida, data } = item;

        return (
           
             <ul key={item.id}>
                <li className='data'><label>Data</label>{data}</li>
                <li><label>Entrada</label>{entrada}</li>
                <li><label>Saída Almoço</label>{saidaAlmoco}</li>
                <li><label>Retorno Almoço</label>{retornoAlmoco}</li>
                <li><label>Saída</label>{saida}</li>
            </ul>
      
        )
    }


    return (
        <div className='container'>
           <h1>Olá, bem vindo. </h1>
            <form onSubmit={handleRegister} id="form">
                <h2>Registrar Horário</h2>
                <div className='form-flex'>
                    <div className='custumer-form'>
                        <label>Entrada:</label>
                        <input type='time' onChange={e => setEntrada(e.target.value)} value={entrada}></input>
                    </div>

                    <div className='custumer-form'>
                        <label>Saída Almoço:</label>
                        <input type='time' onChange={e => setAlmoco(e.target.value)} value={saidaAlmoco}></input>
                    </div>
                    <div className='custumer-form'>
                        <label>Retorno Almoço:</label>
                        <input type='time' onChange={e => setRetorno(e.target.value)} value={retornoAlmoco}></input>
                    </div>
                    <div className='custumer-form'>
                        <label>Saída:</label>
                        <input type='time' onChange={e => setSaida(e.target.value)} value={saida}></input>
                    </div>

                    <div className='custumer-form'>
                        <label>Data:</label>
                        <input type="text" disabled={true} defaultValue={data}></input>
                    </div>
                </div>
                <button type='submit'>Registrar</button>
                <span id="msg-alert"></span>
            </form>
            <h2>Histórico de Registro</h2>
            {userData.map(renderList)}
        </div>
    );
}

