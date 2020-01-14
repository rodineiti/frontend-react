import React, { Component } from "react";
import PropTypes from "prop-types";

class Modal extends Component {
  render() {
    return (
      <div
          id="exampleModalLong"
          className={this.props.modalVisible ? "modal fade show" : "modal fade"}
          role="dialog"
          tabIndex="-1"
          aria-labelledby="exampleModalLongTitle"
          style={
            this.props.modalVisible
            ? { display: "block", paddingRight: 17 }
            : { display: "none" }
          }
          aria-modal="true"
          >
          <div
            className="modal-dialog modal-dialog-scrollable modal-dialog-centered"
            role="document"
            >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Deletar Registro</h4>
              <button
                type="button"
                onClick={this.props.openModal}
                className="close"
              >
                &times;
              </button>              
            </div>
            <div className="modal-body">
              <p>Tem certeza que deseja deletar este resgistro?</p>
            </div>
            <div className="modal-footer">
              <button
                onClick={this.props.openModal}
                type="button"
                className="btn btn-default"
              >
                Close
              </button>
              <button
                onClick={this.props.handleDelete}
                type="button"
                className="btn btn-danger"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  modalVisible: false
};

Modal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Modal;
