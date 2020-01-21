import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Content from '../Content';
import Footer from '../Footer';

import './Forget.scss';
import { errorsMessage } from '../../helpers';
import apis from '../../services/api';

class Forget extends Component {

    state = {
        email: '',
        status: '',
        message: '',
        url: '/'
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.state.email !== '') {
            apis.getForget(this.state.email)
                .then(response => {
                    if (response.data.status === 'success') {
                        toast.success('O link para redefinição de senha foi enviado para o seu e-mail!');
                        this.setState({ status: 'success', message: response.data.message, email: '' });
                    } else {
                        toast.info(response.data.message);
                        this.setState({ status: 'danger', message: response.data.message });
                    }
                }).catch(function (error) {
                    errorsMessage(error.response);
                }).finally(() => console.log('end'));
        }
    }

    render() {
        const { email, status, message } = this.state;
        return (
            <Content>
                <form className="form-signin text-center" onSubmit={this.onSubmit}>
                    <img className="img-fluid mb-4" src="https://via.placeholder.com/570x75/007bff/00000?text=Rdn+Finance" alt="img" />
                    <h1 className="h3 mb-3 font-weight-normal">Resetar Senha - Controle de Finanças</h1>
                    <div className={status !== '' ? `alert alert-${status}` : ``}>{message}</div>
                    <div className="form-group">
                        <label htmlFor="email" className="sr-only">E-mail</label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><i className="fas fa-envelope-square"></i></div>
                            </div>
                            <input type="email" id="email" name="email" className="form-control" placeholder="E-mail" value={this.state.email} required onChange={e => this.setState({ email: e.target.value })} />
                        </div>
                    </div>
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        disabled={!email}>Enviar Link para resetar senha <i className="fas fa-sign-in-alt"></i></button>
                        <Link to="/login" className="nav-link">Já tenho uma conta.</Link>
                </form>
                <Footer className={'footer'} />
            </Content>
        )
    };
}

export default Forget;