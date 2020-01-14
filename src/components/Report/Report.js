import React, { Component } from 'react';
import { toast } from 'react-toastify';
import apis from '../../services/api';
import Content from '../Content';
import { errorsMessage } from '../../helpers';

class Report extends Component {
    state = {
        dateStart: '',
        dateEnd: '',
        billPays: [],
        billReceives: [],
        total_pays: 0,
        total_receives: 0,
        isResults: false
    }

    componentDidMount() {
        document.getElementById("sidebar").classList.remove('active');
    }

    onSubmit = event => {
        event.preventDefault();
        const { dateStart, dateEnd } = this.state;
        const body = {
            dateStart, dateEnd
        };
        apis.getStatementByPeriod(body)
            .then(response => {
                if (response.data.status === 'success') {
                    const { billPays, billReceives, total_pays, total_receives } = response.data.data;
                    this.setState({ billPays, billReceives, total_pays, total_receives, isResults: true });
                } else {
                    toast.info('Erro ao consultar');
                    this.setState({ billPays: [], billReceives: [], total_pays: 0, total_receives: 0, isResults: false });
                }
            }).catch(function (error) {
                errorsMessage(error.response);
                this.setState({ billPays: [], billReceives: [], total_pays: 0, total_receives: 0, isResults: false });
            }).finally(() => console.log('end'));
    }

    changeField = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    renderPays() {
        let data = this.state.billPays || [];
        return data.map((item, key) => {
            return (
                <a key={key} href="#/" className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1"><i className="fas fa-minus"></i> {item.date_launch} - {item.name}</h5>
                        <span className="badge badge-danger badge-pill"> - R$ {item.value}</span>
                    </div>
                </a>
            )
        });
    }

    renderReceives() {
        let data = this.state.billReceives || [];
        return data.map((item, key) => {
            return (
                <a key={key} href="#/" className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1"><i className="fas fa-plus"></i> {item.date_launch} - {item.name}</h5>
                        <span className="badge badge-primary badge-pill"> + R$ {item.value}</span>
                    </div>
                </a>
            )
        });
    }

    render() {
        const { dateStart, dateEnd, total_pays, total_receives, isResults } = this.state;
        return (
            <React.Fragment>
                <Content>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col">
                                            Extrato
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <form method="post" onSubmit={this.onSubmit}>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="form-group">
                                                            <label htmlFor="name">Data Início</label>
                                                            <input className="form-control" type="date" value={dateStart} name="dateStart" required onChange={this.changeField} />
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="form-group">
                                                            <label htmlFor="name">Data Final</label>
                                                            <input className="form-control" type="date" value={dateEnd} name="dateEnd" required onChange={this.changeField} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input className="btn btn-primary" type="submit" name="submit" value="Consultar" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {isResults && (
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="text-center">
                                                    <h2>Totais no período</h2>
                                                    <p>
                                                        <strong>Recebidos: </strong>
                                                        R$ {total_receives}
                                                    </p>
                                                    <p>
                                                        <strong>Pagos: </strong>
                                                        R$ {total_pays}
                                                    </p>
                                                    <p>
                                                        <strong>Total: </strong>
                                                        R$ {(total_receives - total_pays)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="list-group">
                                                    {this.renderPays()}
                                                    {this.renderReceives()}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </React.Fragment>
        )
    }
}

export default Report;