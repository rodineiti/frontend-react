import React, { Component } from 'react';
import Content from '../Content';
import moment from 'moment';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { toast } from 'react-toastify';
import apis from '../../services/api';
import { errorsMessage } from '../../helpers';

class Home extends Component {
    state = {
        dateStart: "2020-01-01",
        dateEnd: moment().endOf('months').format('YYYY-MM-DD'),
        billPays: [],
        billReceives: [],
        total_pays: 0,
        total_receives: 0,
        categoriesPay: [],
        categoriesReceive: [],
        statements: [],
        isResults: false
    }

    componentDidMount() {
        this.getStatements();
    }

    getStatements = () => {
        const { dateStart, dateEnd } = this.state;
        const body = {
            dateStart, dateEnd, status: '1'
        };
        apis.getStatementByPeriod(body)
            .then(response => {
                if (response.data.status === 'success') {
                    const { billPays, billReceives, statements, total_pays, total_receives } = response.data.data;
                    this.setState({ billPays, billReceives, statements, total_pays, total_receives, isResults: true });
                } else {
                    toast.info('Erro ao consultar');
                    this.setState({ billPays: [], billReceives: [], statements: [], total_pays: 0, total_receives: 0, isResults: false });
                }
            }).catch(function (error) {
                errorsMessage(error.response);
                this.setState({ billPays: [], billReceives: [], statements: [], total_pays: 0, total_receives: 0, isResults: false });
            }).finally(() => console.log('end'));

        apis.sumChartsByPeriod(body)
            .then(response => {
                if (response.data.status === 'success') {
                    const { categoriesPay, categoriesReceive } = response.data.data;
                    this.setState({ categoriesPay, categoriesReceive });
                } else {
                    toast.info('Erro ao consultar');
                    this.setState({ categoriesPay: [], categoriesReceive: [] });
                }
            }).catch(function (error) {
                errorsMessage(error.response);
                this.setState({ categoriesPay: [], categoriesReceive: [] });
            }).finally(() => console.log('end'));
    }

    renderStetements() {
        let data = this.state.statements || [];
        return Object.values(data).map((item, key) => {
            return (
                <a key={key} href="#/" className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1"><i className={item.type === 'in' ? 'fas fa-plus' : 'fas fa-minus'}></i> {item.date_launch} - {item.name}</h5>
                        <span className={`badge badge-pill ${item.type === 'in' ? 'badge-primary' : 'badge-warning'}`}>R$ {item.value}</span>
                    </div>
                </a>
            )
        });
    }

    render() {
        const { total_pays, total_receives, categoriesPay, categoriesReceive, dateStart, dateEnd, isResults } = this.state;
        return (
            <React.Fragment>
                <Content>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    Extrato
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Extrato</h5>
                                    {isResults && (
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="text-center">
                                                    <h2>Totais no período: De {dateStart} à {dateEnd}</h2>
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
                                                    {this.renderStetements()}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="card card-primary">
                                <div className="card-header">
                                    Gráfico
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Chartjs</h5>
                                    {isResults && (
                                        <div className="row">
                                            <div className="col-md-6">
                                                <HighchartsReact
                                                    highcharts={Highcharts}
                                                    options={{
                                                        chart: {
                                                            type: 'pie'
                                                        },
                                                        title: {
                                                            text: 'Gráfico de Finanças - Pagos'
                                                        },
                                                        series: [{
                                                            data: categoriesPay
                                                        }]
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <HighchartsReact
                                                    highcharts={Highcharts}
                                                    options={{
                                                        chart: {
                                                            type: 'pie'
                                                        },
                                                        title: {
                                                            text: 'Gráfico de Finanças - Recebidos'
                                                        },
                                                        series: [{
                                                            data: categoriesReceive
                                                        }]
                                                    }}
                                                />
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

export default Home;