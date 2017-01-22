import React from "react";

export default class CreateTodo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      error : null
    };
  }

  renderError(){
    if(!this.state.error){
      return null;
    }else{
      return <div style = {{ color: 'red' }}>{this.state.error}</div>
    }
  }

  handleCreate(e){
    e.preventDefault();
    const createInput = this.createInput;
    const task = createInput.value;
    const validateInput = this.validateInput(task);
    if(validateInput){
      this.setState({error:validateInput});
      return;
    }
    this.setState({ error:null});
    this.props.createTask(task);
    this.createInput.value  = "";
  }

  validateInput(task){
    if(!task){
      return "Please create a valid task";
    }else if(_.find(this.props.todos, todo => todo.task === task)){
      return "Task already registered";
    }else {
      return null;
    }
  }

	render(){
		return (
        <form onSubmit = {this.handleCreate.bind(this)}>
            <input placeholder = "What needs to be done???" ref={(input) => { this.createInput = input; }} />
            <button> Create one </button>
            {this.renderError()}
        </form>
		);
	}
}
