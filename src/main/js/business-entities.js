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
            entityNameInputBoxDisabled: false,
            entityId: "",
            entityIdInputBoxDisabled: false,            
            todos: [],
            businessEntities: []
        };

        // bind all event handlers (JavaScript requirement)
        this.entity=this.entity.bind(this);
        this.entityId=this.entityId.bind(this);
        this.entityNameInputBoxClicked=this.entityNameInputBoxClicked.bind(this);
        this.entityIdInputBoxClicked=this.entityIdInputBoxClicked.bind(this);
        this.fetchBusinessEntity= this.fetchBusinessEntity.bind(this);
        
    }
	
     
   // function for input box onChange in Box
	  entity(event) { this.setState({entity: event.target.value}); }	

	  
   entityId(event) { this.setState({entityId: event.target.value}); } 

   /* entity name input box engaged , disable other box */
   entityNameInputBoxClicked(event) {
     this.setState({entityId : '' }); // blank out value in entity id box
     this.setState({entityIdInputBoxDisabled: true }); // disable the entity id box
    } 
   
   
   /* entity id input box engaged, disable other box */
   entityIdInputBoxClicked(event) {
     this.setState({entity : '' }); // blank out value in entity name box     
     this.setState({entityNameInputBoxDisabled: true }); // disable the entity name box
    } 

	    
	  /*
	    Submit button function.      
	    Retrieves data from a REST call based on what is passed in the input box 
	     entity name is passed via input box, then retrieves all ToDos.
	     'id' a value is passed, then retrieves just that entity by that ID
	  */
	  fetchBusinessEntity(event) {
	    console.log("---- start fetchBusinessEntity");
   		console.log(this.state);
   		
   		// reset the state if its already populated from prior fetch
   		// this will cause, if displayed, the Entities List table to be unrendered
   		this.setState({businessEntities: []});
   		
   		
   		var urlStr;
   		if (this.state.entity) { // searching by a entity name
       urlStr = "/api/businessEntities/search/findByPartialEntityName?entityName=";
       urlStr = urlStr+this.state.entity;
       
       // invoke service
       client({method: 'GET', path: urlStr})
          .done(response => {
          this.setState({businessEntities: response.entity._embedded.businessEntities});
       });

       // let's reset entityNameInputBoxDisabled to active
       this.setState({ entityIdInputBoxDisabled: false });

       
   		} else if (this.state.entityId){ // searching by entity id
       urlStr = "/api/businessEntities/";
       urlStr = urlStr + this.state.entityId;

       // invoke service
       client({method: 'GET', path: urlStr})
          .done(response => {
          this.setState({businessEntities: response});
       });
      
       // let's reset entityNameInputBoxDisabled to active
       this.setState({ entityNameInputBoxDisabled: false });
   		}
		   console.log("---- end fetchBusinessEntity");            
	  }
	  
	
	  render() {
	       const toDosLength = this.state.todos.length;
	       const businessEntitiesLength  = this.state.businessEntities.length;
	        const styleObj= {
	            backgroundColor: this.state.colorForBox,
	            fontSize: 12
	        };		  
	        
	        /* Conditional rendering - https://reactjs.org/docs/conditional-rendering.html 
	         * Render when we have a list of business entities (list length is >= 1)
	         * or 
	         * when there is just one business entity (value is stored in businessEntities.entity)
	         */	        
	        let businessEntityForRender;
         if (this.state && this.state.businessEntities.length>=1) { // rendering list of business entities     
           businessEntityForRender = <BusinessEntitiesList businessEntities={this.state.businessEntities}/>
         } else if (this.state && this.state.businessEntities.entity) { // rendering single business entity
           /*  when searching for a business entity by id, returned values get mapped into businessEntities.entity */
           businessEntityForRender = <OneBusinessEntity oneBusinessEntity={this.state.businessEntities}/>           
         }
	        
        return (
        		<div id="parent">
        	   	<h1 id="heading">Name Search Availability</h1> 
             <section id="rest-section">
                 <div id="rest-section-div" style={styleObj}>                    
                     {/* Input Box */}
                     <div class="form-group">
                         <label for="entity-label">
                             Enter entity name
                         </label>
                         <input
                             id="entity-input"
                             value={this.state.entity}
                             onChange={this.entity}
                             disabled = {this.state.entityNameInputBoxDisabled}
                             onClick = {this.entityNameInputBoxClicked}

                         />
                     </div>
                     <div className="form-group">
                       <label htmlFor="name">Enter entity id </label>
                       <input 
                         id="entityId-input"
                         value={this.state.entityId}
                         onChange={this.entityId}
                       disabled = {this.state.entityIdInputBoxDisabled}
                       onClick = {this.entityIdInputBoxClicked}
                         />
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
                     {businessEntityForRender}
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

/* oneBusinessEntity.entity, because that is where the data is stored */
class OneBusinessEntity extends React.Component { 
  render () {
      return(
          <table id ="businessentity">
              <tbody>
                  <tr>
                    <th>Entity Id</th>
                    <th>Entity Name</th>
                    <th>Entity Type</th>
                    <th>Entity Status Code</th>
                  </tr>
                   <BusinessEntity key={this.props.entityId} businessEntity={this.props.oneBusinessEntity.entity} />
              </tbody>
          </table>            
      )            
  }
}


export default BusinessEntities;