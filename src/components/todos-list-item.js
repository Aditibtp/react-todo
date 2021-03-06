import React from "react";

export default class TodosListItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isEditing : false
    };
  }

  onEditClck(){
     this.setState({ isEditing : true  });
  };

  onCancelClick(){
    this.setState({ isEditing : false });
  };

  renderTaskSection(){
    const {task, isCompleted} = this.props;
    const taskStyle = {
      color: isCompleted ? "green" : "red",
      cursor : 'pointer'
    }
    if(this.state.isEditing){
      return(
        <td>
          <form onSubmit = {this.onSaveClick.bind(this)}>
            <input type='text' defaultValue = {task} ref = {(input) => {this.editInput = input}} />
          </form>
        </td>
      );
    }
    return(
      <td style = {taskStyle} onClick = {this.props.toggleTask.bind(this, task)}>{task}</td>
    )
  };

  renderActionSection(){
    if(this.state.isEditing){
      return(
        <td>
          <button onClick = {this.onSaveClick.bind(this)}>Save</button>
          <button onClick = {this.onCancelClick.bind(this)}>Cancel</button>
        </td>
      );
    }
    return(
      <td>
        <button onClick = {this.onEditClck.bind(this)}>Edit</button>
        <button onClick = {this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
      </td>
    );
  };

  onSaveClick(e){
    e.preventDefault();
    const oldTask = this.props.task;
    const newTask = this.editInput.value;
    this.props.saveTask(newTask, oldTask);
    this.setState({isEditing: false});
  }

	render(){
		return (
			<tr>
        {this.renderTaskSection()}
        {this.renderActionSection()}
			</tr>
		);
	}
}
