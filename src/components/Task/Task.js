import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  state = {
    isEditing: false,
    editText: this.props.description,
  }

  onEditTask = (e) => {
    e.stopPropagation();
    const { done, description } = this.props;
    if (done) {
      return;
    }
    this.setState({
      isEditing: true,
      editText: description,
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({ editText: event.target.value });
  };

  handleEditEnd = () => {
    const { onEditTask, id } = this.props;
    const { editText } = this.state;
    onEditTask(id, editText);
    this.setState({ isEditing: false });
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleEditEnd();
    }
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.handleEditEnd();
  };

  render() {
    const {
      description,
      done,
      id,
      createdAt,
      onCompleteTask,
      onDeleteTask,
    } = this.props;
    const { isEditing, editText } = this.state;
    return (
      <>
        <li className={`${done ? 'completed' : ''}${isEditing ? 'editing' : ''}`} >
          <div className="view">
            <input
              checked={done}
              className="toggle"
              type="checkbox"
              onChange={onCompleteTask}
            />
            {!isEditing ? (
              <label htmlFor={`task-${id}`}>
                <span className="description" onClick={onCompleteTask}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      this.onToogleCompleted(e);
                    }
                  }}
                  role="button"
                  tabIndex={0} >
                  {description}{' '}
                </span>
                <span className="created"> {`created ${formatDistanceToNow(createdAt, {
                  addSuffix: true,
                })} ago`} </span>
              </label>
            ) : null}
            <button onClick={this.onEditTask}
              aria-label="Edit task" type='button' className="icon icon-edit"></button>
            <button
              type='button'
              className="icon icon-destroy"
              onClick={onDeleteTask}
            ></button>
          </div>
          {isEditing && (
          <form onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              className="edit"
              value={editText}
              onChange={this.handleDescriptionChange}
              onBlur={this.handleEditEnd}
              onClick={this.handleKeyPress}
            />
          </form> 
          )}
        </li>
      </>
    );
  }
}

Task.propTypes = {
  description: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onEditTask: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired, 
  onCompleteTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired
}; 