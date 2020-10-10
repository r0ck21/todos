import React, { Component } from "react";
import { getTodos } from "../services/fakeTodoService";
import uuid from "react-uuid";

class Todos extends Component {
  state = {
    todos: [],
    count: 0,
    selectedButton: "all"
  };

  componentDidMount() {
    const todos = getTodos();
    const count = todos.filter(todo => !todo.completed).length;
    this.setState({ todos, count });
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      //prevents the refresh of the page
      e.preventDefault();

      //uuid generates an unique ID
      const todo = { _id: uuid(), task: e.target.value, completed: false };
      const todos = [...this.state.todos, todo];

      //clears field after submiting task
      e.target.value = "";

      this.setState({ todos, count: this.state.count + 1 });
    }
  };

  handleCheckboxSelect = (todo) => {
    const todos = [...this.state.todos];
    const index = todos.indexOf(todo);
    todos[index] = { ...todos[index] };
    todos[index].completed = !todos[index].completed;
    const count = todos.filter(todo => !todo.completed).length;
    this.setState({ todos, count });
  };

  handleButtonSelect = button =>{
    this.setState({selectedButton: button})
  }

  filterTodos = () => { 
    if(this.state.selectedButton === "active"){
      return this.state.todos.filter( todo => !todo.completed);
    }else if(this.state.selectedButton === "completed"){
      return this.state.todos.filter( todo => todo.completed);
    }else{
      return this.state.todos;
    } 
  }


  render() {

    let filtered = this.filterTodos();

    return (
      <div className="container">
        <p className="title">todos</p>
        <div className="main">
          <form onKeyPress={this.handleKeyPress}>
            <input
              type="text"
              className="form-control task-input"
              placeholder="&#xf078;  What needs to be done?"
            />
          </form>
          <ul className="list-group">
            {filtered.map((todo) => (
              <li key={todo._id} className="list-group-item">
                <label
                  className="checkbox-label"
                  style={{
                    textDecoration: todo.completed ? "line-through" : null,
                    opacity: todo.completed ? 0.3 : null,
                  }}
                >
                  {todo.task}
                  <input
                    type="checkbox"
                    id={todo._id}
                    defaultChecked={todo.completed}
                    onClick={() => this.handleCheckboxSelect(todo)}
                  />
                  <span className="checkmark"></span>
                </label>
              </li>
            ))}

            <li className="list-group-item todo-options">
              <p>{this.state.count} items left </p>
              <div className="container-buttons">
                <button type="button" className={this.state.selectedButton === "all" ? "btn btn-light active" : "btn btn-light"}  onClick={() => this.handleButtonSelect("all")}>
                  All
                </button>
                <button type="button" className={this.state.selectedButton === "active" ? "btn btn-light active" : "btn btn-light"} onClick={() => this.handleButtonSelect("active")}>
                  Active
                </button>
                <button type="button" className={this.state.selectedButton === "completed" ? "btn btn-light active" : "btn btn-light"} onClick={() => this.handleButtonSelect("completed")}>
                  Completed
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Todos;
