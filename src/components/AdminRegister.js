import React, { useState, useEffect } from 'react';
import api from './../services/api';
import Form from './Form';
import './admin.css';

export default function AdminRegister({ match }) {

    const [userData, setUserData] = useState([]);
    const [data] = useState(new Date().toLocaleDateString());
    const [inputs, setInputs] = useState([]);
    const [status, setStatus] = useState(false)

    useEffect(() => {

        api.get('/').then(response => {
            const user = response.data.filter((item) => {
                return (item.userID === parseInt(match.params.id));
            });
            setUserData(user);
        });

        
    }, [match.params.id]);

 
    const valores =  [...userData].filter(  item=>{
        if(item.data === data){
            if (item.entrada !== "" &&  item.saidaAlmoco !== "" && item.retornoAlmoco !== ""  &&  item.saida !== "") {
                return item  
            }               
       }
    });

    console.log(valores, '<= julio');
      

    



    useEffect(()=>{
      async  function formExist() {
           await api.get('/').then(response => {
                const teste = response.data.filter(item => {
                    return (item.data === data && item.userID === parseInt(match.params.id));
                });
                
                setInputs(teste)
                //if (teste.length > 0) setFormUp(true);
            });
        }
        formExist();
        
    },[data]);

    

    const renderList = (item) => {
        const { entrada, saidaAlmoco, retornoAlmoco, saida, data } = item;

        return (
            <div className='box-wrapper' key={item.id}>
                <ul>
                    <li className='data'>Data: {data}</li>
                    <li className='custumer-register'><label>Entrada</label>{entrada}</li>
                    <li className='custumer-register'><label>Saída Almoço</label>{saidaAlmoco}</li>
                    <li className='custumer-register'><label>Retorno Almoço</label>{retornoAlmoco}</li>
                    <li className='custumer-register'><label>Saída</label>{saida}</li>
                </ul>
            </div>
        )
    }


    return (
        <>
            <header>
                <h1>Olá, bem-vindo! </h1>
                <span>Hoje é {data}</span>
            </header>
            <div className='container'>
                <Form userID={match.params.id} registros={inputs} test={valores.length}   />
                <h2>Histórico de Registro</h2>
                {userData.map(renderList)}
            </div>
        </>
    );
}

