import React from 'react';
import Task from '../Task/Task';
import PropTypes from 'prop-types'; 

function TaskList({ data, onCompleteTask, onDeleteTask, onEditTask }) {
  return (
    <ul className="todo-list">
      {data.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          description={task.description}
          done={task.done}
          createdAt={task.createdAt}
          status={task.status}
          onCompleteTask={() => onCompleteTask(task.id)}
          onDeleteTask={() => onDeleteTask(task.id)}
          onEditTask={onEditTask}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string,
      done: PropTypes.bool,
    })
  ).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
}; 

export default TaskList;
