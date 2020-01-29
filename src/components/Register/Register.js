import React, { Component } from "react";
import { toast } from "react-toastify";
import Content from "../Content";
import Footer from "../Footer";

import { errorsMessage } from "../../helpers";
import { isLoggedIn } from "../../services/auth";
import apis from "../../services/api";

import logo from "./../../assets/images/logo.png";
import "./Register.scss";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    url: "/",
    status: "",
    message: ""
  };

  componentDidMount() {
    if (isLoggedIn()) {
      window.location.href = this.state.url;
    }
  }

  onSubmit = e => {
    e.preventDefault();
    if (
      this.state.name !== "" &&
      this.state.email !== "" &&
      this.state.password !== "" &&
      this.state.password_confirmation !== ""
    ) {
      let body = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      };

      apis
        .postRegister(body)
        .then(response => {
          if (response.data.status === "success") {
            toast.success(response.data.message);
            this.setState({
              status: "success",
              message: response.data.message,
              name: "",
              email: "",
              password: "",
              password_confirmation: ""
            });
          } else {
            toast.info("Erro ao tentar cadastrar, favor verificar");
            this.setState({
              status: "success",
              message: "Erro ao tentar cadastrar, favor verificar"
            });
          }
        })
        .catch(function(error) {
          errorsMessage(error.response);
        })
        .finally(() => console.log("end"));
    }
  };

  render() {
    const {
      name,
      email,
      password,
      password_confirmation,
      status,
      message
    } = this.state;

    return (
      <Content>
        <form
          className="form-signup text-center"
          onSubmit={e => this.onSubmit(e)}
        >
          <img className="img-fluid mb-4" src={logo} alt="img" />
          <h1 className="h3 mb-3 font-weight-normal">
            Registro - Controle de Finanças
          </h1>
          <div className={status !== "" ? `alert alert-${status}` : ``}>
            {message}
          </div>
          <div className="form-group">
            <label htmlFor="name" className="sr-only">
              Nome
            </label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={name}
                placeholder="Nome"
                required
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="sr-only">
              E-mail
            </label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-envelope-square"></i>
                </div>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={email}
                placeholder="E-mail"
                required
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="sr-only">
              Senha
            </label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-unlock-alt"></i>
                </div>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={password}
                placeholder="Senha"
                required
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="sr-only">
              Confirmar Senha
            </label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-unlock-alt"></i>
                </div>
              </div>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={password_confirmation}
                className="form-control"
                placeholder="Confirmar Senha"
                required
                onChange={e =>
                  this.setState({ password_confirmation: e.target.value })
                }
              />
            </div>
          </div>
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            disabled={!name || !email || !password || !password_confirmation}
          >
            Cadastrar <i className="fas fa-user-plus"></i>
          </button>
        </form>
        <Footer className={"footer"} />
      </Content>
    );
  }
}

export default Register;
