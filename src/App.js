import React from 'react';
import './style.css';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import Footer from './components/Footer/Footer';
import TaskList from './components/TaskList/TaskList';

export default class App extends React.Component {
  state = {
    selFilter: 'all',
    todoData: [
      
    ],
  };

  maxId = 100;

  createTodoItem(description) {
    return {
      description,
      createdAt: new Date(),
      done: false,
      status: '',
      id: this.maxId++,
    };
  }

  onCompleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
      };
      const newArr = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];
      return { todoData: newArr };
    });
  };

  onDeleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  

  handleFilter = (filter) => {
    this.setState({
      selFilter: filter,
    });
  };

  clearCompleted = () => {
    const { todoData } = this.state;
    const newArr = todoData.filter((el) => !el.done);
    this.setState({
      todoData: newArr,
    });
  };

  onEditTask = (id, newDescription) => {
    this.setState(({ todoData }) => {
      const updatedTasks = todoData.map((task) =>
        task.id === id ? { ...task, description: newDescription } : task
      );
      return { todoData: updatedTasks };
    });
  }; 

  render() {
    const todoCount = this.state.todoData.filter((el) => !el.done).length;
    const { selFilter, todoData } = this.state;
    let tasksFilter;
    if (selFilter === 'all') {
      tasksFilter = todoData;
    } else if (selFilter === 'completed') {
      tasksFilter = todoData.filter((el) => el.done);
    } else {
      tasksFilter = todoData.filter((el) => !el.done);
    }
    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            data={tasksFilter}
            onCompleteTask={this.onCompleteTask}
            onDeleteTask={this.onDeleteTask}
            onEditTask={this.onEditTask}
          />
          <Footer
            selFilter={selFilter}
            handleFilter={this.handleFilter}
            clearCompleted={this.clearCompleted}
            todoCount={todoCount}
          />
        </section>
      </section>
    );
  }
}
