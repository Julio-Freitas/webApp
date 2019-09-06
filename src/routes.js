/** configurando rotas da aplicação */
import React from 'react';
import {BrowserRouter, Switch, Route, Redirect}  from 'react-router-dom';
import Login from './components/Login';
import NewUser from './components/NewUser';
import AdminRegister from './components/AdminRegister';
import {isAuthenticated}  from './services/authCheck';

const RouterAuth = ({component : Component, ...rest}) => (
    <Route {...rest} render = {props => (
        isAuthenticated() ? (
            <Component {...props} />
        ): (
            <Redirect to={{pathname: '/', state: {from:props.location}} }/>
        )
    )}/>
)

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route  path='/' exact component={Login} />
                <Route path='/novo' exact component={NewUser} />
                <RouterAuth path='/registro/:id' exact component={AdminRegister}  />
            </Switch>          
        </BrowserRouter>
    )
}