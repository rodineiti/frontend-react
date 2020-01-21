import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Content from '../Content';
import Footer from '../Footer';

import './PasswordReset.scss';
import { errorsMessage } from '../../helpers';
import apis from '../../services/api';

class PasswordReset extends Component {

    state = {
        email: '',
        password: '',
        password_confirmation: '',
        token: '',
        status: '',
        message: '',
        url: '/login'
    };

    componentDidMount() {
        const { token } = this.props.match.params;
        this.showReset(token);
    }

    showReset = (token) => {
        apis.getShowReset(token)
            .then(response => {
                if (response.data.status === 'success') {
                    this.setState({ token: response.data.data.token });
                } else {
                    toast.info(response.data.message);
                    this.setState({ status: 'danger', message: response.data.message });
                }
            }).catch(function (error) {
                errorsMessage(error.response);
            }).finally(() => console.log('end'));
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.state.email !== '' && this.state.password !== '' 
                && this.state.password_confirmation !== '' && this.state.token !== '') {

            let body = {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation,
                token: this.state.token
            };

            apis.postReset(body)
                .then(response => {
                    if (response.data.status === 'success') {
                        this.setState({ 
                            status: 'success',
                            message: response.data.message,
                            email: '',
                            password: '',
                            password_confirmation: '',
                            token: ''
                        });
                    } else {
                        toast.info(response.data.message);
                        this.setState({ status: 'danger', message: response.data.message });
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
        const { email, password, password_confirmation, status, message } = this.state;

        return (
            <Content>
                <form className="form-signup text-center" onSubmit={(e) => this.onSubmit(e)}>
                    <img className="img-fluid mb-4" src="https://via.placeholder.com/570x75/007bff/00000?text=Rdn+Finance" alt="img" />
                    <h1 className="h3 mb-3 font-weight-normal">Resetar Senha - Controle de Finanças</h1>
                    <div className={status !== '' ? `alert alert-${status}` : ``}>{message}</div>
                    <div className="form-group">
                        <label htmlFor="email" className="sr-only">E-mail</label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><i className="fas fa-envelope-square"></i></div>
                            </div>
                            <input type="email" id="email" name="email" className="form-control" placeholder="E-mail"
                              value={email} required onChange={e => this.setState({ email: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="sr-only">Nova Senha</label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><i className="fas fa-unlock-alt"></i></div>
                            </div>
                            <input type="password" id="password" name="password" className="form-control" placeholder="Senha"
                              value={password} required onChange={e => this.setState({ password: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="sr-only">Confirmar Senha</label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><i className="fas fa-unlock-alt"></i></div>
                            </div>
                            <input type="password" id="password_confirmation" name="password_confirmation" className="form-control" placeholder="Confirmar Senha"
                              value={password_confirmation} required onChange={e => this.setState({ password_confirmation: e.target.value })} />
                        </div>
                    </div>
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        disabled={!email || !password || !password_confirmation}>Resetar <i className="fas fa-user-plus"></i></button>
                    <Link to="/login" className="nav-link">Efetuar Login.</Link>
                </form>
                <Footer className={'footer'} />
            </Content>
        )
    }
}

export default PasswordReset;