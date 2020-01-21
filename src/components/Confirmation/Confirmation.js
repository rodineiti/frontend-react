import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Content from '../Content';
import Footer from '../Footer';

import './Confirmation.scss';
import { errorsMessage } from '../../helpers';
import apis from '../../services/api';

class Confirmation extends Component {

    state = {
        status: '',
        message: '',
        url: '/login'
    };

    componentDidMount() {
        const { token } = this.props.match.params;
        this.getConfirmation(token);
    }

    getConfirmation = (token) => {
        apis.getConfirmation(token)
            .then(response => {
                if (response.data.status === 'success') {
                    this.setState({ 
                        status: 'success',
                        message: response.data.message
                    });
                } else {
                    toast.info(response.data.message);
                    this.setState({ status: 'danger', message: response.data.message });
                }
            }).catch(function (error) {
                errorsMessage(error.response);
            }).finally(() => console.log('end'));
    }

    render() {
        const { status, message } = this.state;

        return (
            <Content>
                <form className="form-signup text-center">
                    <img className="img-fluid mb-4" src="https://via.placeholder.com/570x75/007bff/00000?text=Rdn+Finance" alt="img" />
                    <h1 className="h3 mb-3 font-weight-normal">Confirmação de cadastro - Controle de Finanças</h1>
                    <div className={status !== '' ? `alert alert-${status}` : ``}>{message}</div>
                    <Link to="/login" className="nav-link">Efetuar Login.</Link>
                </form>
                <Footer className={'footer'} />
            </Content>
        )
    }
}

export default Confirmation;