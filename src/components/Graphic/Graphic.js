import React, { Component } from 'react';
import { toast } from 'react-toastify';
import apis from '../../services/api';
import Content from '../Content';
import { errorsMessage } from '../../helpers';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class Graphic extends Component {
    state = {
        dateStart: '',
        dateEnd: '',
        ategoriesPay: [],
        categoriesReceive: [],
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
        apis.sumChartsByPeriod(body)
            .then(response => {
                if (response.data.status === 'success') {
                    const { categoriesPay, categoriesReceive } = response.data.data;
                    this.setState({ categoriesPay, categoriesReceive, isResults: true });
                } else {
                    toast.info('Erro ao consultar');
                    this.setState({ categoriesPay: [], categoriesReceive: [], isResults: false });
                }
            }).catch(function (error) {
                errorsMessage(error.response);
                this.setState({ categoriesPay: [], categoriesReceive: [], isResults: false });
            }).finally(() => console.log('end'));
    }

    changeField = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { dateStart, dateEnd, categoriesPay, categoriesReceive, isResults } = this.state;
        return (
            <React.Fragment>
                <Content>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col">
                                            Gráfico
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <form method="post" onSubmit={this.onSubmit}>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="name">Data Início</label>
                                                            <input className="form-control" type="date" value={dateStart} name="dateStart" required onChange={this.changeField} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
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
            </React.Fragment >
        )
    }
}

export default Graphic;