/**
 * 
 */

import React, {Component} from 'react';

class ToDos extends Component {
	
	constructor(props) {
        super(props);
        this.state = {
            colorForBox: "green",
            id: "",
            todos: []
        };

        this.submitToDoListReqest= this.submitToDoListReqest.bind(this);
        this.id=this.id.bind(this);
    }
      
    // function for input box onChange in Box
    id(event) {
        this.setState({
           id: event.target.value
        });
    }	
	
	/*
	    Submit button function.      
	    Retreives data from a public URL based on 
	     'all' is passed via input box, then retrievse all ToDos.
	     'id' a value is passed, then retrieves just that ToDo for that ID
	  */
	  submitToDoListReqest(event) {
	    console.log("---- start submitToDoListReqest");
		  console.log(this.state);
		
		      var urlStr = "https://jsonplaceholder.typicode.com/todos/";
		  if (this.state.id !=="all"){ // is "all" passed then get all todos, else get just the passed one
		          urlStr = urlStr+this.state.id;
		      } 
		      fetch(urlStr)
		          .then(response => response.json())
		          .then(todos => this.setState({ todos }));            
		  console.log("---- end submitToDoListReqest");            
		  }
	  
	
	  render() {
	       const toDosLength = this.state.todos.length;
	        const styleObj= {
	            backgroundColor: this.state.colorForBox,
	            fontSize: 12
	        };		  
        return (
                <section id="rest-section">
                    <div id="rest-section-div" style={styleObj}>                    
                        {/* Input Box */}
                        <div class="form-group">
                            <label for="todo-label">
                                Enter a ToDo Id to retrieve or 'all' to retreive all ToDos and press Submit:
                            </label>
                            <input
                                id="todo-input"
                                value={this.state.id}
                                onChange={this.id}
                            />
                        </div>
                        {/* Submit Button */}
                        <center>
                            <div>
                                <button
                                    id="botton-for-Box"
                                    onClick={this.submitToDoListReqest} >
                                    {" "}
                                    Submit{" "}
                                </button>
                            </div>
                        </center>
                    </div>
                        {/* if more then 1 todo, display in table format. else display just one todo */}
                        <h2> ToDos List </h2>
                        {  toDosLength > 1  ? ( // if more then 1 todo display in table format
                              <ToDoList todos={this.state.todos}/>
                             ) : (  // else display the 1 todo
                                <OneToDo todo={this.state.todos}/>
                            )
                       }
                </section>
            );    	
    };
        
}

/* Couldn't figure out a way to modify ToDoList to list out when only one ID is being searched */
class OneToDo extends React.Component { 
     render () {
         return(
             <table id ="todos">
                 <tbody>
                     <tr>
                         <th>UserId</th>
                         <th>Id</th>
                         <th>Title</th>
                         <th>Completed</th>
                     </tr>
                      <ToDo key={this.props.id} todo={this.props.todo} />
                 </tbody>
             </table>            
         )            
     }
 }

/* prints the table columns and rows */
class ToDoList extends React.Component { 
     render () {                               
         var todos = this.props.todos.map (
            todo => <ToDo key={todo.id} todo={todo} />
         );           
         return(
             <table id ="todos">
                 <tbody>
                     <tr>
                         <th>UserId</th>
                         <th>Id</th>
                         <th>Title</th>
                         <th>Completed</th>
                     </tr>
                    {todos}
                 </tbody>
             </table>            
         )            
     }
 }

/* prints the table rows */
class ToDo extends React.Component {
  render() {
        var todo = this.props.todo
      return (
       <tr>
           <td>{todo.userId}</td>
           <td>{todo.id}</td>
           <td>{todo.title}</td>
           <td>{String(todo.completed)}</td>
			</tr>           
      )  
  }     
}

export default ToDos;