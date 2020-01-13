import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Content from '../Content';
import apis from '../../services/api';
import { errorsMessage } from '../../helpers';

class BillPay extends Component {
    state = {
        list: []
    };

    componentDidMount() {
        this.index()
    }

    index = () => {
        apis.getBillPays()
            .then(response => {
                this.setState({ list: response.data.data });
            }).catch(function (error) {
                errorsMessage(error.response);
            }).finally(() => console.log('end'));
    }

    destroy = (id) => {
        apis.delBillPay(id)
            .then(response => {
                if (response.data.status === 'success') {
                    toast.success(response.data.message);
                    this.index();
                } else {
                    toast.info(response.data.message);
                }
            }).catch(function (error) {
                errorsMessage(error.response);
            }).finally(() => console.log('end'));
    }

    renderList = (list) => {
        let data = this.state.list || [];
        return data.map((item, key) => {
            return (
                <tr key={key}>
                    <th scope="row">{item.id}</th>
                    <td>{item.category.name}</td>
                    <td>{item.date_launch}</td>
                    <td>{item.name}</td>
                    <td>{item.value}</td>
                    <td>
                        <Link className="btn btn-info" to={`/billpay/edit/${item.id}`}>Editar</Link>
                    </td>
                    <td><button onClick={() => this.destroy(item.id)} className="btn btn-danger">Deletar</button></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <React.Fragment>
                <Content>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col">
                                            Contas a pagar
                                        </div>
                                        <div className="col text-right">
                                            <Link className="btn btn-primary" to={'/billpay/add'}>Adicionar</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Categoria</th>
                                                <th scope="col">Data Lançamento</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Valor</th>
                                                <th scope="col">Editar</th>
                                                <th scope="col">Deletar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderList()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </React.Fragment>
        )
    }
}

export default BillPay;