import React, { Component } from 'react';

class Todo extends Component {
    render() { 

        const {todo, handleCheckbox} = this.props;

        return ( <React.Fragment>
        <li className="list-group-item">
            <label
            className="checkbox-label"
            style={{
                textDecoration: todo.completed ? "line-through" : null,
                opacity: todo.completed ? 0.3 : null,
            }}
            >
            {this.props.todo.task}
            <input
                type="checkbox"
                id={todo._id}
                defaultChecked={todo.completed}
                onClick={() => handleCheckbox(todo)}
            />
            <span className="checkmark"></span>
            </label>
        </li>
      </React.Fragment> );
    }
}
 
export default Todo;