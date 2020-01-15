import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import apis from '../../services/api';
import Content from '../Content';
import { errorsMessage } from '../../helpers';

class AddCategory extends Component {
    state = {
        name: ''
    }

    onSubmit = event => {
        event.preventDefault();
        const { name } = this.state;
        const body = {
            name
        };
        apis.postCategories(body)
            .then(response => {
                if (response.data.status === 'success') {
                    toast.success(response.data.message);
                    setTimeout(() => {
                        this.props.history.push('/category');
                    }, 500);
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
        const { name } = this.state;
        return (
            <React.Fragment>
                <Content>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col">
                                            Adicionar Categoria
                                        </div>
                                        <div className="col text-right">
                                            <Link className="btn btn-warning" to={'/category'}>Voltar</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form method="post" onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="name">Nome</label>
                                            <input className="form-control" type="text" value={name} name="name" required onChange={this.changeField} />
                                        </div>
                                        <div className="form-group">
                                            <input className="btn btn-primary" type="submit" name="submit" value="Adicionar" />
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

export default AddCategory;