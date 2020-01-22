import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import apis from '../../services/api';
import Content from '../Content';
import { errorsMessage } from '../../helpers';

class EditBillPay extends Component {
    state = {
        category_id: '',
        date_launch: '',
        name: '',
        value: '',
        status: '',
        categories: []
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.show(id);
        this.getCategories();
    }

    show = (id) => {
        apis.getBillPay(id)
            .then(response => {
                const { category_id, date_launch, name, value, status } = response.data.data;
                this.setState({ category_id, date_launch, name, value, status: status ? '1' : '0' });
            }).catch(function (error) {
                errorsMessage(error.response);
            }).finally(() => console.log('end'));
    }

    getCategories = () => {
        apis.getCategories()
            .then(response => {
                this.setState({ categories: response.data.data });
            }).catch(function (error) {
                errorsMessage(error.response);
            }).finally(() => console.log('end'));
    }

    onSubmit = event => {
        event.preventDefault();
        const { id } = this.props.match.params;
        const { category_id, date_launch, name, value, status } = this.state;
        const body = {
            category_id,
            date_launch,
            name,
            value,
            status
        };
        apis.putBillPays(id, body)
            .then(response => {
                if (response.data.status === 'success') {
                    toast.success(response.data.message);
                    setTimeout(() => {
                        this.props.history.push('/billpay');
                    }, 500);
                } else {
                    toast.info('Erro tentar atualizar, favor verificar');
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
        const { category_id, date_launch, name, value, status, categories } = this.state;
        return (
            <React.Fragment>
                <Content>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col">
                                            Editar Conta a pagar                                        </div>
                                        <div className="col text-right">
                                            <Link className="btn btn-warning" to={'/billpay'}>Voltar</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form method="post" onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="name">Categoria</label>
                                            <select className="form-control" name="category_id" value={category_id} onChange={this.changeField}>
                                                <option value="">Selecionar uma Categoria</option>
                                                {categories.map(item =>
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                )}
                                            </select>
                                        </div>
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
                                            <label htmlFor="name">Status</label>
                                            <select className="form-control" name="status" value={status} onChange={this.changeField}>
                                                <option value="">Selecionar o Status</option>
                                                <option value={'1'}>Pago</option>
                                                <option value={'0'}>Não Pago</option>
                                            </select>
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

export default EditBillPay;