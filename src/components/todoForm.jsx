import React, { Component } from 'react'

class TodoForm extends Component {
    render() { 
        return ( 
        <React.Fragment>
        <form onKeyPress={this.props.keyPress}>
            <input
              type="text"
              className="form-control task-input"
              placeholder="&#xf078;  What needs to be done?"
            />
          </form>
          </React.Fragment> );
    }
}
 
export default TodoForm;