import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from '../Modal';
import Content from '../Content';
import apis from '../../services/api';
import { errorsMessage } from '../../helpers';

class Category extends Component {
    state = {
        list: [],
        itemId: null,
        modalVisible: false
    };

    componentDidMount() {
        this.index()
    }

    index = () => {
        apis.getCategories()
            .then(response => {
                this.setState({ list: response.data.data });
            }).catch(function (error) {
                errorsMessage(error.response);
            }).finally(() => console.log('end'));
    }

    destroy = (id) => {
        apis.delCategory(id)
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

    openModal = (itemId = null) => {
        this.setState({ modalVisible: !this.state.modalVisible, itemId });
    }

    handleDelete = (itemId) => {
        this.destroy(itemId);
        this.openModal();
    }

    renderList = (list) => {
        let data = this.state.list || [];
        return data.map((item, key) => {
            return (
                <tr key={key}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>
                        <Link className="btn btn-info" to={`/category/edit/${item.id}`}>Editar</Link>
                    </td>
                    <td><button onClick={(itemId) => this.openModal(item.id)} className="btn btn-danger">Deletar</button></td>
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
                                            Categorias
                                        </div>
                                        <div className="col text-right">
                                            <Link className="btn btn-primary" to={'/category/add'}>Adicionar</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nome</th>
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

                    <Modal
                      openModal={this.openModal}
                      modalVisible={this.state.modalVisible}
                      handleDelete={() => this.handleDelete(this.state.itemId)}
                    />
                </Content>
            </React.Fragment>
        )
    }
}

export default Category;