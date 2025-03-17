import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.label);
    this.setState({
      label: '',
    });
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  };
  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          onChange={this.onLabelChange}
          placeholder="What Need to be done"
          value={this.state.label}
          onKeyDown={this.onKeyDown}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
}; 
