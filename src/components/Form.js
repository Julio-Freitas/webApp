import React, {useState, useEffect} from 'react';
import api from './../services/api';

export default function  Form (props) {
    
    const {registros, test} = props
    console.log(test)
    const [entrada, setEntrada] = useState('');
    const [saidaAlmoco, setAlmoco] = useState('');
    const [retornoAlmoco, setRetorno] = useState('');
    const [saida, setSaida] = useState('');
    const [data] = useState(new Date().toLocaleDateString());



 
useEffect(()=>{
    registros.forEach(input => {
        setEntrada(input.entrada);
        setAlmoco(input.saidaAlmoco);
        setRetorno(input.retornoAlmoco);
        setSaida(input.saida);
    });
 
},[registros]);
       
 
    async function handleRegister(e) {
       
        e.preventDefault();
        await api.post('/registro', {
            entrada,
            saidaAlmoco,
            retornoAlmoco,
            saida,
            data,
            userID: parseInt(props.userID)
        }).then(results => {
            if (results.data === 'nOk') {
                if(test === 1){
                    document.querySelector('#msg-alert').innerHTML = `Registros do dia já foram realizados!`;
                }else{
                    update();
                }
                
            } else {
                window.location.reload();
            };

        }).catch(err => {
            console.log(err);
        });

    }

    async function update(){
    
        await api.put('/registro', {
            entrada,
            saidaAlmoco,
            retornoAlmoco,
            saida,
            data,
            userID: parseInt(props.userID)
        }).then(results => {
            //window.location.reload();
            console.log(results)
        });
    }


   
    return (
        <form onSubmit={handleRegister} id="form" className='box-wrapper'>
            <h2>Registrar Horário</h2>
            <div className='form-flex'>
                <div className='data'>
                    Data:
                    <input type="text" name='date' disabled={true} defaultValue={data}></input>
                </div>
                <div className='custumer-register'>
                    <label>Entrada:</label>
                    <input type='time' onChange={e => setEntrada(e.target.value)} value={entrada} />
                </div>

                <div className='custumer-register'>
                    <label>Saída Almoço:</label>
                    <input type='time' onChange={e => setAlmoco(e.target.value)} value={saidaAlmoco}></input>
                </div>
                <div className='custumer-register'>
                    <label>Retorno Almoço:</label>
                    <input type='time' onChange={e => setRetorno(e.target.value)} value={retornoAlmoco}></input>
                </div>
                <div className='custumer-register'>
                    <label>Saída:</label>
                    <input type='time' onChange={e => setSaida(e.target.value)} value={saida}></input>
                </div>
            </div>
            <button type='submit'>Registrar</button>
            <span id="msg-alert"></span>
        </form>
    );
}