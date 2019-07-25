import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Content from '../Content';

import './Login.css';
import { errorsMessage } from '../../helpers';
import apis from '../../services/api';
import { setUser, isLoggedIn } from '../../services/auth';

class Login extends Component {

    state = {
        email: '',
        password: '',
        url: process.env.NODE_ENV === 'development' ? '/' : '/frontend-react-gh-pages'
    };

    componentDidMount() {
        if (isLoggedIn()) {
            window.location.href = this.state.url;
        }
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.state.email !== '' && this.state.password !== '') {
            apis.getLogin(this.state.email, this.state.password)
                .then(response => {
                    if (response.data) {
                        setUser(response.data);
                        this.redirect('Login realizado com sucesso.', 1000, this.state.url);
                    } else {
                        toast.info('Usuário ou senha inválidos, favor verificar');
                    }
                }).catch(function (error) {
                    errorsMessage(error.response);
                }).finally(() => console.log('end'));
        }
    }

    redirect(msg, timeout, url) {
        toast.success(msg);
        setTimeout(() => {
            window.location.href = url;
        }, timeout);
    }

    render() {
        const { email, password } = this.state;
        return (
            <Content>
                <form className="form-signin text-center" onSubmit={(e) => this.onSubmit(e)}>
                    <img className="mb-4" src="https://via.placeholder.com/75" alt="img" />
                    <h1 className="h3 mb-3 font-weight-normal">Login - Controle de Finanças</h1>
                    <div className="form-group">
                        <label htmlFor="email" className="sr-only">E-mail</label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><i className="fas fa-envelope-square"></i></div>
                            </div>
                            <input type="text" id="email" name="email" className="form-control" placeholder="E-mail" required onChange={e => this.setState({ email: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="sr-only">Senha</label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><i className="fas fa-unlock-alt"></i></div>
                            </div>
                            <input type="password" id="password" name="password" className="form-control" placeholder="Senha" required onChange={e => this.setState({ password: e.target.value })} />
                        </div>
                    </div>
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        disabled={!email || !password}>Entrar <i className="fas fa-sign-in-alt"></i></button>
                </form>
            </Content>
        )
    };
}

export default Login;