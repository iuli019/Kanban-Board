import React, { Component } from "react";

class Modal extends Component {
  nameChange = (e) => {
    this.props.onNameChange(e.target.value);

    //function namechange= this.setState({ name: e.target.value });
  };

  descpChange = (e) => {
    this.props.onDescpChange(e.target.value);
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
              <h4 className="modal-title">Add new task</h4>
            </div>
            <div className="modal-body">
              <label>Task name: </label> <br></br>
              <input
                onChange={(e) => this.nameChange(e)}
                className="form-control"
                type="text"
                placeholder="Name...."
                value={this.props.name}
              ></input>
              <br />
              <label>Description: </label>
              <br></br>
              <input
                onChange={(e) => this.descpChange(e)}
                className="form-control"
                type="text"
                placeholder="Description...."
                value={this.props.description}
              />
            </div>
            <div className="modal-footer">
              <button
                onClick={this.props.onClose}
                type="button"
                className="btn btn-outline-dark"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
