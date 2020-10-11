import React, { Component } from "react";
import { getTodos } from "../services/fakeTodoService";
import uuid from "react-uuid";
import Todo from './todo';
import TodoForm from './todoForm';

const buttonAll = "all";
const buttonActive = "active";
const buttonCompleted = "completed";

class Todos extends Component {
  state = {
    todos: [],
    count: 0,
    selectedButton: buttonAll
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
    if(this.state.selectedButton === buttonActive){
      return this.state.todos.filter( todo => !todo.completed);
    }else if(this.state.selectedButton === buttonCompleted){
      return this.state.todos.filter( todo => todo.completed);
    }
      return this.state.todos;
  }


  render() {

    let filtered = this.filterTodos();

    return (
      <div className="container">
        <p className="title">todos</p>
        <div className="main">
        <TodoForm keyPress={this.handleKeyPress}/>
          <ul className="list-group">
            {filtered.map((todo) => ( <Todo key={todo._id} todo={todo} handleCheckbox={this.handleCheckboxSelect}/>))}

            <li className="list-group-item todo-options">
              <p>{this.state.count} items left </p>
              <div className="container-buttons">
                <button type="button" className={this.state.selectedButton === buttonAll ? "btn btn-light active" : "btn btn-light"}  onClick={() => this.handleButtonSelect(buttonAll)}>
                  All
                </button>
                <button type="button" className={this.state.selectedButton === buttonActive ? "btn btn-light active" : "btn btn-light"} onClick={() => this.handleButtonSelect(buttonActive)}>
                  Active
                </button>
                <button type="button" className={this.state.selectedButton === buttonCompleted ? "btn btn-light active" : "btn btn-light"} onClick={() => this.handleButtonSelect(buttonCompleted)}>
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
