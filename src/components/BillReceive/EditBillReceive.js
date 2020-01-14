import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import apis from '../../services/api';
import Content from '../Content';
import { errorsMessage } from '../../helpers';

class EditBillReceive extends Component {
    state = {
        date_launch: '',
        name: '',
        value: ''
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.show(id);
    }

    show = (id) => {
        apis.getBillReceive(id)
            .then(response => {
                const { date_launch, name, value } = response.data.data;
                this.setState({ date_launch, name, value });
            }).catch(function (error) {
                errorsMessage(error.response);
            }).finally(() => console.log('end'));
    }

    onSubmit = event => {
        event.preventDefault();
        const { id } = this.props.match.params;
        const { date_launch, name, value } = this.state;
        const body = {
            date_launch,
            name,
            value
        };
        apis.putBillReceives(id, body)
            .then(response => {
                if (response.data.status === 'success') {
                    toast.success(response.data.message);
                    setTimeout(() => {
                        this.props.history.push('/billreceive');
                    }, 1000);
                } else {
                    toast.info(response.data.message);
                }
            }).catch(function (error) {
                errorsMessage(error.response);
            }).finally(() => console.log('end'));
    }

    changeField = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { date_launch, name, value } = this.state;
        return (
            <React.Fragment>
                <Content>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col">
                                            Editar Conta a receber
                                        </div>
                                        <div className="col text-right">
                                            <Link className="btn btn-warning" to={'/billreceive'}>Voltar</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form method="post" onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="name">Data de Lançamento</label>
                                            <input className="form-control" type="date" value={date_launch} name="date_launch" required onChange={this.changeField} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Nome</label>
                                            <input className="form-control" type="text" value={name} name="name" required onChange={this.changeField} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Valor</label>
                                            <input className="form-control" type="text" value={value} name="value" required onChange={this.changeField} />
                                        </div>
                                        <div className="form-group">
                                            <input className="btn btn-primary" type="submit" name="submit" value="Editar" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </React.Fragment>
        )
    }
}

export default EditBillReceive;