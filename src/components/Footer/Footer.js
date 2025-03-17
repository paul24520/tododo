import React from 'react';
import Tasksfilters from '../TasksFilter/TasksFilter';
import PropTypes from 'prop-types'; 

function Footer({ handleFilter, selFilter, clearCompleted, todoCount }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <Tasksfilters handleFilter={handleFilter} selFilter={selFilter} />
      <button onClick={clearCompleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}

 Footer.propTypes = {
  todoCount: PropTypes.number.isRequired,
  selFilter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}; 

export default Footer;
