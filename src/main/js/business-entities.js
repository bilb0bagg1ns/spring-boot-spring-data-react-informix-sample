/**
 * 
 */

import React, {Component} from 'react';

const client = require('./client');

class BusinessEntities extends Component {
	
	constructor(props) {
        super(props);
        this.state = {
            colorForBox: "green",
            entity: "",
            todos: [],
            businessEntities: []
        };

        this.fetchBusinessEntity= this.fetchBusinessEntity.bind(this);
        this.entity=this.entity.bind(this);
    }
      
    // function for input box onChange in Box
	entity(event) {
        this.setState({
        	entity: event.target.value
        });
    }	
	
	/*
	    Submit button function.      
	    Retreives data from a public URL based on 
	     'all' is passed via input box, then retrievse all ToDos.
	     'id' a value is passed, then retrieves just that ToDo for that ID
	  */
	  fetchBusinessEntity(event) {
	    console.log("---- start fetchBusinessEntity");
		  console.log(this.state);
		
		  var urlStr = "/api/businessEntities/search/findByPartialEntityName?entityName=";
		  if (this.state.entity !=="all"){ // is "all" passed then get all todos, else get just the passed one
		          urlStr = urlStr+this.state.entity;
	      } 
			client({method: 'GET', path: urlStr})
			   .done(response => {
				this.setState({businessEntities: response.entity._embedded.businessEntities});
			});
		  
			console.log("---- end fetchBusinessEntity");            
		  }
	  
	
	  render() {
	       const toDosLength = this.state.todos.length;
	       const businessEntitiesLength  = this.state.businessEntities.length;
	        const styleObj= {
	            backgroundColor: this.state.colorForBox,
	            fontSize: 12
	        };		  
        return (
                <section id="rest-section">
                    <div id="rest-section-div" style={styleObj}>                    
                        {/* Input Box */}
                        <div class="form-group">
                            <label for="entity-label">
                                Enter entity to retrieve and press Submit:
                            </label>
                            <input
                                id="entity-input"
                                value={this.state.entity}
                                onChange={this.entity}
                            />
                        </div>
                        {/* Submit Button */}
                        <center>
                            <div>
                                <button
                                    id="botton-for-Box"
                                    onClick={this.fetchBusinessEntity} >
                                    {" "}
                                    Submit{" "}
                                </button>
                            </div>
                        </center>
                    </div>
                        {/* if more then 1 todo, display in table format. else display just one todo */}
                        <h2> Entitities List </h2>
                        {  businessEntitiesLength > 1  ? ( // if more then 1 business entity to display in table format
                			  <BusinessEntitiesList businessEntities={this.state.businessEntities}/>
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
                      <ToDo key={this.props.entity} todo={this.props.todo} />
                 </tbody>
             </table>            
         )            
     }
 }

/* prints the table columns and rows */
class ToDoList extends React.Component { 
     render () {                               
         var todos = this.props.todos.map (
            todo => <ToDo key={todo.entity} todo={todo} />
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
           <td>{todo.entity}</td>
           <td>{todo.title}</td>
           <td>{String(todo.completed)}</td>
			</tr>           
      )  
  }     
}

class BusinessEntitiesList extends React.Component{
	render() {
		var businessEntities = this.props.businessEntities.map(businessEntity =>
			<BusinessEntity key={businessEntity._links.self.href} businessEntity={businessEntity}/>
		);
		return (	
			<table id="busentities">
				<tbody>
					<tr>
					<th>Entity Id</th>
					<th>Entity Name</th>
					<th>Entity Type</th>
					<th>Entity Status Code</th>
					</tr>
					{businessEntities}
				</tbody>
			</table>
		)
	}
}

class BusinessEntity extends React.Component{
	render() {
		return (
			<tr>
			<td>{this.props.businessEntity.entityId}</td>
			<td>{this.props.businessEntity.entityName}</td>
			<td>{this.props.businessEntity.entityType}</td>
			<td>{this.props.businessEntity.entityStatusCd}</td>
			</tr>
		)
	}
}

export default BusinessEntities;