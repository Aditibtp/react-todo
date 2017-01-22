import React from "react";
import TodosList from "./todos-list.js";
import CreateTodo from "./create-todos.js";

const todos = [
	{
		task: "Create react app",
		isCompleted: false
	},
	{
		task: "Eat food",
		isCompleted: true
	},
	{
		task: "Read Pride and Prejudice",
		isCompleted: false
	},
	{
		task: "Sleep",
		isCompleted: true
	}
];

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = { todos };  //try using this as a prop instead of state
	}

	createTask(task){
		this.state.todos.push({
			task,
			isCompleted : false
		});
		this.setState({ todos: this.state.todos });
	};

	toggleTask(task){
		const foundTodo = _.find(this.state.todos, todo => todo.task === task);
		foundTodo.isCompleted = !foundTodo.isCompleted;
		this.setState({todos: this.state.todos});
	}

	saveTask(newTask, oldTask){
		const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
		foundTodo.task = newTask;
		console.log(this.state.todos);
		this.setState({ todos: this.state.todos});
	}

	deleteTask(taskToDelete){
		_.remove(this.state.todos, todo => todo.task === taskToDelete);
		this.setState({todos: this.state.todos});
	}

	render(){
		return (
			<div>
				<h1> React todo app </h1>
				<CreateTodo todos = {this.state.todos} createTask = {this.createTask.bind(this)}/>
				<TodosList todos = {this.state.todos}
				 toggleTask = {this.toggleTask.bind(this)}
				 saveTask = {this.saveTask.bind(this)}
				 deleteTask = {this.deleteTask.bind(this)} />
			</div>
		);
	}
}
