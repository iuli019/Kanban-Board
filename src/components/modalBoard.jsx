import React, { Component } from "react";

class Modal extends Component {
  titleChange = (e) => {
    this.props.onTitleChange(e.target.value);
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal-fade ">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-body">
                <label>List Title:</label>
                <br />
                <input onChange={(e) => this.titleChange(e)} />
                <div className="modal-footer">
                  <button
                    className="btn btn-outline-dark"
                    onClick={this.props.onClick}
                  >
                    Add List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
