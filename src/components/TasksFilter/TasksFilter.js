import React from 'react';
import PropTypes from 'prop-types'; 

function Tasksfilters({ handleFilter, selFilter }) {
  return (
    <ul className="filters">
      <li>
        <button
          onClick={() => handleFilter('all')}
          className={selFilter === 'all' ? 'selected' : ''}
        >
          All
        </button>
      </li>
      <li>
        <button
          onClick={() => handleFilter('active')}
          className={selFilter === 'active' ? 'selected' : ''}
        >
          Active
        </button>
      </li>
      <li>
        <button
          onClick={() => handleFilter('completed')}
          className={selFilter === 'completed' ? 'selected' : ''}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

export default Tasksfilters;

Tasksfilters.propTypes = {
handleFilter: PropTypes.func.isRequired,
selFilter: PropTypes.string.isRequired
}
