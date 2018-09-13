/**
 * 
 */

import React, {Component} from 'react';

const client = require('./client');

class BusinessEntities extends Component {
	
	constructor(props) {
        super(props);
        this.state = {
            colorForBox: "lightskyBlue",
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
	    Retrieves data from a public URL based on 
	     'all' is passed via input box, then retrieves all ToDos.
	     'id' a value is passed, then retrieves just that ToDo for that ID
	  */
	  fetchBusinessEntity(event) {
	    console.log("---- start fetchBusinessEntity");
		console.log(this.state);
		
		// reset the state if its already populated from prior fetch
		// this will cause, if displayed, the Entities List table to be unrendered
		this.setState({businessEntities: []});
		
		var urlStr = "/api/businessEntities/search/findByPartialEntityName?entityName=";
		if (this.state.entity !=="all"){ // is "all" passed then get all todos, else get just the passed one
		          urlStr = urlStr+this.state.entity;
	     }

		// invoke service
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
        		<div id="parent">
        	   	<h1 id="heading">Name Search Availability</h1> 
             <section id="rest-section">
                 <div id="rest-section-div" style={styleObj}>                    
                     {/* Input Box */}
                     <div class="form-group">
                         <label for="entity-label">
                             Enter entity to retrieve and submit:
                         </label>
                         <input
                             id="entity-input"
                             value={this.state.entity}
                             onChange={this.entity}
                         />
                     </div>
                     <div className="form-group">
                       <label htmlFor="name">Your full name *</label>
                       <input className="form-control" name="name" ref="name" required type="text" />
                       </div>
                     {/* Submit Button */}
                     <center>
                         <div>
                             <button
                                 id="botton-for-Box"
                                 onClick={this.fetchBusinessEntity} >
                                 {" "}
                                 Search {" "}
                             </button>
                         </div>
                     </center>
                 </div>
                     {/* display found entity(ies) in tabular format.*/
                      /* display only if businessEntities list has at least 1 value */
                     }
                     { this.state && this.state.businessEntities.length>=1 &&
                        <div>
                          <h2> Entities List </h2>
         			        <BusinessEntitiesList businessEntities={this.state.businessEntities}/>
         			     </div>
                     }
             </section>
           </div>
        );    	
    };

    
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

/*
 * This is called by BusinessEntitiesList for rendering each business entity
 */
class BusinessEntity extends React.Component{
	render() {
		var businessEntity = this.props.businessEntity

		return (
			<tr>
			<td>{businessEntity.entityId}</td>
			<td>{businessEntity.entityName}</td>
			<td>{businessEntity.entityType}</td>
			<td>{businessEntity.entityStatusCd}</td>
			</tr>
		)
	}
}

export default BusinessEntities;